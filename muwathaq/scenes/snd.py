"""Sound for a «موثّق» infographic. Usage: python3 snd.py JOBDIR  (reads job.json with scene starts)"""
import sys, os, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scipy.io import wavfile
from fxlib import *
D = sys.argv[1]; job = json.load(open(D + '/job.json', encoding='utf-8')); END = job['total']
B = Buf(END); M = Buf(END); tt = np.arange(B.N) / SR
def stamp(): return drum(.45, 75) * .9 + np.pad(slap(.25), (0, int(SR * .2)))
def note(f, d=1.4, a=.35):
    t = T(d); return sum(np.sin(2 * np.pi * f * k * t) * np.exp(-t * (2.5 + k)) / k ** 1.4 for k in (1, 2, 3)) * np.minimum(1, t / .003) * a
B.put(rv(drum(1.2, 48), 1.5, .3), .24, .7); B.put(rv(stamp(), .8, .25), .24, .6)
B.put(rv(note(587.3), 2, .4), .6, .5); B.put(rv(note(880), 2, .4), .74, .45); B.put(rv(whoosh(.35, True), .8, .25), .75, .45)
# calm documentary bed: 84 bpm pulse + slow pad changing per scene
e = 60 / 84 / 2; k = 0; roots = [73.42, 58.27, 65.41, 87.31, 73.42, 58.27, 65.41, 73.42]
starts = [s['start'] for s in job['scenes']]
while 1.0 + k * e < END - .8:
    t = 1.0 + k * e; si = max(i for i, a in enumerate(starts) if a <= t + 1e-6) if t >= starts[0] else 0; r = roots[si % len(roots)]
    s = T(e * .9); M.put(lp(np.sign(np.sin(2 * np.pi * r * s)), 360) * np.exp(-s * 7) * .10, t, 1.)
    if k % 4 == 0: M.put(drum(.35, 70), t, .10)
    k += 1
for i, s in enumerate(job['scenes']):
    r = roots[i % len(roots)]; put_stereo(M, pad([r * 2, r * 3, r * 4, r * 5], s['dur'] + .8, .05, 1400), s['start'] - .2)
    if i: B.put(rv(whoosh(.4, False), 1, .3), s['start'] - .45, .35); B.put(rv(drum(.6, 62), 1.2, .3), s['start'], .25)
    if s['type'] == 'bignum': B.put(riser(1.2), s['start'] + .3, .25); B.put(rv(stamp(), .8, .25), s['start'] + 1.5, .35)
    if s['type'] == 'pair':
        B.put(riser(1.4), s['start'] + 1.0, .22); B.put(rv(stamp(), .8, .25), s['start'] + 2.5, .4); B.put(rv(note(880, 1.2, .3), 1.5, .4), s['start'] + 2.55, .3)
        for j in range(2): B.put(rv(whoosh(.45, True), .8, .2), s['start'] + .4 + j * .18, .16)
    if s['type'] == 'verdict':
        B.put(rv(whoosh(.4, True), .8, .2), s['start'] + 1.7, .2); B.put(rv(stamp(), .8, .25), s['start'] + 1.95, .5); B.put(riser(1.1), s['start'] + 2.9, .2)
    if s['type'] == 'map': B.put(rv(stamp(), .8, .25), s['start'] + 1.0, .4)
    if s['type'] == 'bars':
        for j in range(len(s['rows'])): B.put(rv(whoosh(.5, True), .8, .2), s['start'] + .6 + j * .55, .18)
B.put(rv(whoosh(.4, False), 1, .3), END - .85, .4); B.put(rv(stamp(), .8, .25), END - .45, .5); B.put(rv(note(587.3, 1., .3), 1.2, .4), END - .4, .4)
mix = B.a * .6 + M.a * .6; mix *= np.clip((END - tt) / .25, 0, 1)[:, None]; mix /= np.max(np.abs(mix)) * 1.05
wavfile.write(D + '/mix.wav', SR, (mix * 32767).astype(np.int16)); print('mix.wav ok', END)
