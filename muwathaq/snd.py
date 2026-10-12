"""Sound for a «موثّق» news clip. Usage: python3 snd.py JOBDIR  (reads JOBDIR/job.json, writes JOBDIR/mix.wav)"""
import sys, os, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from scipy.io import wavfile
from fxlib import *
D = sys.argv[1]; cfg = json.load(open(D + '/job.json', encoding='utf-8'))
brk = cfg.get('breaking', False); END = float(cfg.get('dur', 12)); B = Buf(END); M = Buf(END); tt = np.arange(B.N) / SR
def stamp(): return drum(.45, 75) * .9 + np.pad(slap(.25), (0, int(SR * .2)))
def note(f, d=1.4, a=.35):
    t = T(d); return sum(np.sin(2 * np.pi * f * k * t) * np.exp(-t * (2.5 + k)) / k ** 1.4 for k in (1, 2, 3)) * np.minimum(1, t / .003) * a
def stab(f=146.83, d=1.2):
    t = T(d); s = sum(np.sign(np.sin(2 * np.pi * f * r * t)) * .5 / (k + 1) for k, r in enumerate([1, 1.5, 2, 3]))
    return lp(s, 2400) * np.exp(-t * 3.5) * np.minimum(1, t / .004) * .45
# 1-second seal sting
B.put(rv(drum(1.2, 48), 1.5, .3), .24, .7); B.put(rv(stamp(), .8, .25), .24, .6)
B.put(rv(note(587.3), 2, .4), .6, .5); B.put(rv(note(880), 2, .4), .74, .45)
if brk: B.put(rv(stab(), 1.5, .35), .6, .6); B.put(sub22(1.2), .6, .4)
B.put(rv(whoosh(.35, True), .8, .25), .75, .45)
# pulse bed
e = 60 / (120 if brk else 92) / 2; k = 0; t0 = 1.0
roots = [(0, 73.42), (END / 3, 58.27), (2 * END / 3, 87.31)] if brk else [(0, 58.27), (END / 2, 65.41)]
while t0 + k * e < END - .8:
    t = t0 + k * e; r = [f for a, f in roots if a <= t][-1]; s = T(e * .9)
    M.put(lp(np.sign(np.sin(2 * np.pi * r * s)), 500 if brk else 380) * np.exp(-s * 8) * (.16 if brk else .11), t, 1.)
    if brk and k % 2 == 0: M.put(drum(.3, 90), t, .14)
    k += 1
put_stereo(M, pad([146.8, 220, 293.7, 349.2] if brk else [116.5, 174.6, 233.1, 293.7], END - 1.2, .05, 1600), 1.0)
ca = 1.25 + len(cfg['words']) * .17 + .25; B.put(rv(stamp(), .8, .25), ca, .35)       # source chip
if brk and cfg.get('focus'): B.put(rv(whoosh(.6, True), 1.2, .3), END - 3.8, .45); B.put(rv(drum(1.3, 55), 1.8, .35), END - 2.45, .5)
B.put(rv(whoosh(.4, False), 1, .3), END - .85, .4); B.put(rv(stamp(), .8, .25), END - .45, .5); B.put(rv(note(587.3, 1., .3), 1.2, .4), END - .4, .4)
mix = B.a * .6 + M.a * .6; mix *= np.clip((END - tt) / .25, 0, 1)[:, None]; mix /= np.max(np.abs(mix)) * 1.05
wavfile.write(D + '/mix.wav', SR, (mix * 32767).astype(np.int16)); print('mix.wav ok')
