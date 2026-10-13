#!/usr/bin/env python3
"""ACRPS study-video — job setup and asset preparation.

  prep.py init  <job>                                  new job folder (engine + brand assets + empty clips/map)
  prep.py pdf   <study.pdf> <job>                       per-page text in <job>/src/ + printed-page offset
  prep.py clip  <video> <job> <id> --ss 4.8 --t 6 [--fx .5 --fy .5]
                                                        graded 1080x1350 JPEG frames @30fps in a/clips/<id>/ (audio dropped)
  prep.py photo <image> <job> <name> [--mode pan|full|card|bg] [--fx .5 --fy .5]
                pan  -> a/ph/<name>.jpg 1458px high, for {photo:'<name>.jpg',pan:[x0,x1]} backgrounds
                full -> a/ph/<name>.jpg 1080x1350, for {img:'a/ph/<name>.jpg'} backgrounds
                card -> a/ph/<name>.jpg 1440x810, for the 'card' component
                bg   -> a/ph/<name>.jpg 1080x1350 blurred teal duotone (behind a card)
  prep.py cover <image-or-pdf> <job>                    a/ph/cover.jpg (journal/book cover for the 'cover' component)
  prep.py clips <job>                                   rebuild a/clips.js (frame counts)
"""
import sys, os, json, shutil, subprocess, argparse, re, collections
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
CLIP_GRADE = "eq=contrast=1.05:saturation=0.9,colorbalance=rs=-.05:gs=.01:bs=.07:rm=-.02:bm=.03"
# photo grade measured from the approved photos: teal shadows, slightly cooler highs
CURVES = {0: [(0,0),(10,1),(40,28),(80,69),(128,121),(180,179),(230,236),(255,255)],
          1: [(0,0),(10,10),(40,39),(80,81),(128,132),(180,188),(230,239),(255,255)],
          2: [(0,12),(10,18),(40,45),(80,85),(128,134),(180,186),(230,240),(255,255)]}

def sh(*a): subprocess.run(a, check=True)

def init(job):
    a = f'{job}/a'; os.makedirs(f'{a}/clips', exist_ok=True); os.makedirs(f'{a}/ph', exist_ok=True)
    os.makedirs(f'{job}/out', exist_ok=True); os.makedirs(f'{job}/src', exist_ok=True)
    for f in ('comp.html', 'lib.js', 'r3.mjs'): shutil.copy(f'{ROOT}/engine/{f}', f'{job}/{f}')
    for f in os.listdir(f'{ROOT}/assets'):
        dst = f'{a}/{f}'
        if not os.path.exists(dst): os.symlink(f'{ROOT}/assets/{f}', dst)
    if not os.path.exists(f'{a}/music.mp3'): os.symlink(f'{ROOT}/assets/music_default.mp3', f'{a}/music.mp3')
    if not os.path.exists(f'{a}/map.js'): open(f'{a}/map.js', 'w').write("var MAPJSON='{}';\n")
    nm = f'{ROOT}/node_modules'
    if os.path.isdir(nm) and not os.path.exists(f'{job}/node_modules'): os.symlink(nm, f'{job}/node_modules')
    if not os.path.exists(f'{job}/cfg.js'):
        open(f'{job}/cfg.js', 'w', encoding='utf8').write("// scenes — see acrps/example/cfg.js for every option\nvar S = [\n];\n")
    clips(job); print('job ready:', job)

def clips(job):
    d = f'{job}/a/clips'; nf = {}
    for c in sorted(os.listdir(d)):
        if os.path.isdir(f'{d}/{c}'): nf[c] = len([x for x in os.listdir(f'{d}/{c}') if x.endswith('.jpg')])
    open(f'{job}/a/clips.js', 'w').write('var NF=' + json.dumps(nf) + ';\n'); print('clips:', nf)

def pdf(src, job):
    out = f'{job}/src'; os.makedirs(out, exist_ok=True)
    n = int(re.search(r'Pages:\s+(\d+)', subprocess.check_output(['pdfinfo', src]).decode()).group(1))
    offs = collections.Counter()
    for i in range(1, n + 1):
        p = f'{out}/p{i:02d}.txt'; sh('pdftotext', '-f', str(i), '-l', str(i), src, p)
        for ln in open(p, encoding='utf8', errors='ignore'):
            s = re.sub(r'[‎‏‪-‮⁦-⁩\s]', '', ln)
            if re.fullmatch(r'\d{1,3}', s): offs[int(s) - i] += 1
    sh('pdftoppm', '-f', '1', '-l', '1', '-jpeg', '-r', '110', src, f'{out}/page1')
    off = offs.most_common(1)[0][0] if offs else 0
    open(f'{out}/pages.txt', 'w').write(f'pdf_pages={n}\nprinted_page = pdf_page + {off}\n')
    print(f'{n} pages -> {out}/pNN.txt ; printed page = PDF page + {off}  (votes {dict(offs.most_common(3))})')
    print('NOTE: pdftotext mangles Arabic ligatures (لا/ال); quote the study from the PDF page itself, not from the raw text.')

def clip(src, job, cid, ss, t, fx, fy):
    d = f'{job}/a/clips/{cid}'; shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    vf = (f"scale=1080:1350:force_original_aspect_ratio=increase:flags=lanczos,"
          f"crop=1080:1350:(iw-1080)*{fx}:(ih-1350)*{fy},{CLIP_GRADE},fps=30")
    sh('ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(t), '-i', src, '-an', '-vf', vf, '-q:v', '2', f'{d}/%04d.jpg')
    clips(job)

def lut():
    import numpy as np
    return [np.interp(np.arange(256), [p[0] for p in CURVES[c]], [p[1] for p in CURVES[c]]).astype('uint8') for c in range(3)]

def grade(im):
    import numpy as np
    from PIL import Image
    A = np.asarray(im.convert('RGB')); L = lut()
    return Image.fromarray(np.stack([L[c][A[..., c]] for c in range(3)], 2))

def fit(im, W, H, fx=.5, fy=.5):
    from PIL import Image
    s = max(W / im.width, H / im.height); im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = round((im.width - W) * fx); y = round((im.height - H) * fy); return im.crop((x, y, x + W, y + H))

def photo(src, job, name, mode, fx, fy):
    from PIL import Image, ImageFilter
    import numpy as np
    im = Image.open(src).convert('RGB'); out = f'{job}/a/ph/{name}.jpg'
    if mode == 'pan':
        im = im.resize((round(im.width * 1458 / im.height), 1458), Image.LANCZOS)
        if im.width < 1180: im = fit(im, 1180, 1458, fx, fy)   # too narrow for a pan: widen by cropping height
        im = grade(im)
    elif mode == 'full': im = grade(fit(im, 1080, 1350, fx, fy))
    elif mode == 'card': im = grade(fit(im, 1440, 810, fx, fy))
    elif mode == 'bg':
        im = fit(im, 540, 675, fx, fy).filter(ImageFilter.GaussianBlur(14)).resize((1080, 1350), Image.LANCZOS)
        g = np.asarray(im.convert('L')).astype(float)[..., None] / 255
        lo, hi = np.array([2, 28, 36.]), np.array([64, 158, 168.])
        im = Image.fromarray((lo + (hi - lo) * g).clip(0, 255).astype('uint8'))
    im.save(out, quality=92); print(out, im.size)

def cover(src, job):
    from PIL import Image
    out = f'{job}/a/ph/cover.jpg'
    if src.lower().endswith('.pdf'):
        sh('pdftoppm', '-f', '1', '-l', '1', '-jpeg', '-r', '150', src, f'{job}/src/cover_pdf'); src = f'{job}/src/cover_pdf-1.jpg'
        if not os.path.exists(src): src = [f'{job}/src/{x}' for x in os.listdir(f'{job}/src') if x.startswith('cover_pdf')][0]
    im = Image.open(src).convert('RGB'); im = im.resize((round(im.width * 850 / im.height), 850), Image.LANCZOS)
    im.save(out, quality=94); print(out, im.size)

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('cmd'); ap.add_argument('args', nargs='*')
    ap.add_argument('--ss', type=float, default=0); ap.add_argument('--t', type=float, default=15)
    ap.add_argument('--fx', type=float, default=.5); ap.add_argument('--fy', type=float, default=.5)
    ap.add_argument('--mode', default='pan'); o = ap.parse_args(); A = o.args
    if o.cmd == 'init': init(A[0])
    elif o.cmd == 'clips': clips(A[0])
    elif o.cmd == 'pdf': pdf(A[0], A[1])
    elif o.cmd == 'clip': clip(A[0], A[1], A[2], o.ss, o.t, o.fx, o.fy)
    elif o.cmd == 'photo': photo(A[0], A[1], A[2], o.mode, o.fx, o.fy)
    elif o.cmd == 'cover': cover(A[0], A[1])
    else: print(__doc__)
