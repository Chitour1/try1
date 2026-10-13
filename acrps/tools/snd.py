#!/usr/bin/env python3
"""Sound for an ACRPS study video: news-bed music + synthesized SFX on every transition/accent, ducked, -14 LUFS.
   python3 tools/snd.py <job> [music.mp3]     (run tools/cfg2json.mjs first)  ->  <job>/out/mix.wav
   No narration. The raw audio of the generated clips is NEVER used.
   Music longer than the video is trimmed; shorter music is stretched with atempo (<= ~4% is inaudible),
   beyond that it is looped with a crossfade. Always a 2.8 s fade-out at the end."""
import sys, os, json, subprocess, numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE); from fxlib import *   # SFX synth, bundled in tools/
import pyloudnorm as pyln
from scipy.ndimage import uniform_filter1d

job = sys.argv[1]; music = sys.argv[2] if len(sys.argv) > 2 else f'{job}/a/music.mp3'
TL = json.load(open(f'{job}/out/timeline.json')); TOT = float(TL['total']); S = TL['scenes']

# ---- music bed fitted to the exact length ----
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', music]).decode())
mw = f'{job}/out/music_fit.wav'
if dur >= TOT: af = f"afade=t=out:st={TOT-2.8:.2f}:d=2.8"
elif TOT / dur <= 1.045: af = f"atempo={dur/(TOT+.2):.4f},afade=t=out:st={TOT-2.8:.2f}:d=2.8"
else: af = None
if af: subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', music, '-af', af, '-t', str(TOT), '-ar', '48000', '-ac', '2', mw], check=True)
else:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', music, '-i', music, '-filter_complex',
                    f"[0][1]acrossfade=d=4,afade=t=out:st={TOT-2.8:.2f}:d=2.8", '-t', str(TOT), '-ar', '48000', '-ac', '2', mw], check=True)

B = Buf(TOT + 4)
def A(a, b):
    n = max(len(a), len(b)); o = np.zeros(n); o[:len(a)] += a; o[:len(b)] += b; return o
def ticks(d, step=.075, g=.55):
    n = int(SR * d); y = np.zeros(n + SR // 10); k = 0.
    while k < d: i = int(k * SR); s = tick(.05); y[i:i + len(s)] += s * g * (.7 + .3 * rng.random()); k += step * (1 + .2 * (k / d))
    return y
def typing(d):
    n = int(SR * d); y = np.zeros(n + SR // 10); k = 0.
    while k < d: i = int(k * SR); s = lp(tick(.06), 3800); y[i:i + len(s)] += s * rng.uniform(.4, .8); k += rng.uniform(.07, .16)
    return y
K = {'swell': lambda e: rumble(2.5) * .6, 'braam': lambda e: rv(braam(3.2), 2.5, .3), 'hit': lambda e: rv(drum(1.2, 70), 1.5, .25),
     'thud': lambda e: A(drum(1.0, 52), slap() * .35), 'riser': lambda e: riser(e.get('d', 1.4)), 'whoosh': lambda e: whoosh(.55),
     'shimmer': lambda e: shimmer(2.6), 'tick': lambda e: tick(.05) * .8, 'ticks': lambda e: ticks(e.get('d', 1.4)), 'shutter': lambda e: shutter() * .9,
     'drum': lambda e: A(rv(drum(1.6, 48), 2.0, .3), subdrop(1.6) * .5), 'chime': lambda e: rv(chime(2.2, 880), 2.2, .35) * .5, 'typing': lambda e: typing(e.get('d', 3)),
     'heartbeat': lambda e: heartbeat() * 1.2, 'bell': lambda e: rv(bell(4., 196), 3, .3) * .8, 'snap': lambda e: snap()}
G = {'braam': .55, 'hit': .6, 'thud': .6, 'riser': .6, 'whoosh': .45, 'shimmer': .5, 'tick': .35, 'ticks': .35, 'shutter': .5, 'drum': .7,
     'chime': .6, 'typing': .5, 'heartbeat': .9, 'bell': .45, 'snap': .45, 'swell': .5}
ev = []
for s in S:   # automatic transition sounds
    b = s['start']; t = s['tin']
    if t == 'wipe': ev += [(b - .42, 'whoosh', .9)]
    if t == 'zoom': ev += [(b - .32, 'whoosh', .9), (b, 'hit', .45)]
    if t == 'whip': ev += [(b - .3, 'whoosh', .8)]
    if t == 'flash': ev += [(b, 'snap', 1), (b, 'hit', .4)]
    if t == 'leak': ev += [(b - .45, 'shimmer', .6)]
    for e in s['sfx']: ev.append((b + e['t'], e['k'], e.get('g', 1), e))
for e in ev:
    at, k, g = e[0], e[1], e[2]; ex = e[3] if len(e) > 3 else {}
    B.put(K[k](ex), at, G[k] * g, float(rng.uniform(-.15, .15)))
fx = B.a[:int(SR * TOT)]
mus, sr = sf.read(mw)
if mus.ndim == 1: mus = np.stack([mus, mus], 1)
mus = mus[:len(fx)]
if len(mus) < len(fx): mus = np.pad(mus, ((0, len(fx) - len(mus)), (0, 0)))
env = np.ones(len(fx))
for e in ev:
    if e[1] in ('braam', 'drum'):
        i = int(e[0] * SR); j = min(len(env), i + int(SR * 1.6)); env[i:j] = np.minimum(env[i:j], .6)
env = uniform_filter1d(env, int(SR * .15))
mix = mus * .62 * env[:, None] + fx * .9
L = pyln.Meter(SR).integrated_loudness(mix); mix = pyln.normalize.loudness(mix, L, -14.0)
if np.abs(mix).max() > .89: mix = np.tanh(mix / .89) * .89
sf.write(f'{job}/out/mix.wav', mix, SR); print('mix.wav', round(TOT, 2), 's  events', len(ev))
