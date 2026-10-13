#!/usr/bin/env python3
"""Render an ACRPS study video as delivery parts, each cut BEFORE a scene transition and rendered on its own
(so motion is never broken by a cut and the parts join seamlessly), each under the size limit, never re-compressed.

  python3 tools/render.py <job> --name ACRPS-Bishara [--max 14] [--limit 29500000] [--workers 2]
  python3 tools/render.py <job> --name ... --only 112,121    after a LOCAL fix that did not change the total length:
                                                              re-render only the parts containing these seconds,
                                                              keep the previous cuts and reuse every other part
  (without --only everything is rendered fresh)
Needs out/timeline.json (tools/cfg2json.mjs) and out/mix.wav (tools/snd.py).
Output: <job>/out/parts/<name>-partNN-of-MM.mp4 (+ out/full.mp4 joined losslessly, for checking/archiving)."""
import os, sys, json, math, glob, shutil, argparse, subprocess
from concurrent.futures import ThreadPoolExecutor
ap = argparse.ArgumentParser(); ap.add_argument('job'); ap.add_argument('--name', default='ACRPS-video')
ap.add_argument('--max', type=float, default=14.0); ap.add_argument('--limit', type=int, default=29_500_000)
ap.add_argument('--workers', type=int, default=2); ap.add_argument('--only', default='')
o = ap.parse_args(); J = os.path.abspath(o.job); OUT = f'{J}/out'; SEG = f'{OUT}/seg'; os.makedirs(SEG, exist_ok=True)
TL = json.load(open(f'{OUT}/timeline.json')); TOT = float(TL['total'])
NODE = shutil.which('node') or '/opt/node22/bin/node'

def plan():
    cand = [round(s['start'] - .8, 2) for s in TL['scenes'][1:]]   # 0.8 s before every transition starts
    cuts = [0.0]; cur = 0.0
    while TOT - cur > o.max:
        ok = [c for c in cand if cur + 4 < c <= cur + o.max]
        if ok: nxt = max(ok)
        else:   # one long stretch without a transition: split it evenly
            nc = next((c for c in cand if c > cur), TOT); n = math.ceil((nc - cur) / o.max); nxt = round(cur + (nc - cur) / n, 2)
        cuts.append(nxt); cur = nxt
    cuts.append(TOT)
    if len(cuts) > 2 and cuts[-1] - cuts[-2] < 3: cuts.pop(-2)
    return cuts

def seg_path(a, b): return f'{SEG}/v_{a:.2f}_{b:.2f}.mp4'
def render_seg(ab):
    a, b = ab; p = seg_path(a, b)
    subprocess.run([NODE, 'r3.mjs', J, 'video', str(a), str(b), p], cwd=J, env={**os.environ, 'VW': '1080', 'VH': '1350'}, stdout=subprocess.DEVNULL, check=True)
    return p

only = [float(x) for x in o.only.split(',') if x.strip()]
if only and os.path.exists(f'{OUT}/cuts.txt'):          # local fix: keep the delivered cuts, reuse untouched segments
    cuts = [float(x) for x in open(f'{OUT}/cuts.txt').read().split()]
    if abs(cuts[-1] - TOT) > .01: sys.exit('timeline length changed -> run without --only (full render)')
else:                                                    # full render: never reuse old segments (content may have changed)
    shutil.rmtree(SEG, ignore_errors=True); os.makedirs(SEG); cuts = plan()
while True:
    segs = list(zip(cuts[:-1], cuts[1:]))
    todo = [s for s in segs if not os.path.exists(seg_path(*s)) or any(s[0] <= t < s[1] for t in only)]
    print(f'{len(segs)} parts, rendering {len(todo)}:', [f'{a:.1f}-{b:.1f}' for a, b in todo], flush=True)
    with ThreadPoolExecutor(o.workers) as ex: list(ex.map(render_seg, todo))
    only = []
    big = [s for s in segs if os.path.getsize(seg_path(*s)) > o.limit - 400_000]   # leave room for the audio track
    if not big: break
    for a, b in big: m = round((a + b) / 2, 2); cuts.append(m); print(f'part {a:.1f}-{b:.1f} too big -> split at {m}')
    cuts = sorted(cuts)

shutil.rmtree(f'{OUT}/parts', ignore_errors=True); os.makedirs(f'{OUT}/parts')
segs = list(zip(cuts[:-1], cuts[1:])); n = len(segs); lst = []
for i, (a, b) in enumerate(segs, 1):
    out = f'{OUT}/parts/{o.name}-part{i:02d}-of-{n:02d}.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', seg_path(a, b), '-ss', str(a), '-to', str(b), '-i', f'{OUT}/mix.wav', '-map', '0:v', '-map', '1:a',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', '-shortest', out], check=True)
    sz = os.path.getsize(out); lst.append(out); print(f'{os.path.basename(out)}  {a:7.2f}-{b:7.2f}  {sz/1e6:5.1f} MB', '  OVER LIMIT!' if sz > o.limit else '')
open(f'{OUT}/cuts.txt', 'w').write(' '.join(f'{c:.2f}' for c in cuts) + '\n')
open(f'{OUT}/concat.txt', 'w').write(''.join(f"file '{p}'\n" for p in lst))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{OUT}/concat.txt', '-c', 'copy', f'{OUT}/full.mp4'], check=True)
d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{OUT}/full.mp4']).decode())
print(f'full.mp4 {d:.2f}s (timeline {TOT:.2f}s)', 'OK' if abs(d - TOT) < .1 else 'CHECK!')
