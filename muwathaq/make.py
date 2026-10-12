"""Build a ready-to-render job folder for a «موثّق» news clip.
Usage: python3 make.py job.json OUTDIR
job.json keys: format ("9x16" default | "16x9"), breaking (bool), color (hex), label, date, credit,
source, words (headline split into words), key (indexes of words in the category colour), dur (s, default 12),
ticker (list of verified lines, breaking only), photo (path), focus ([x,y] on the 1920x1080 photo for the
closing dive, breaking only; omit for no dive)."""
import json, os, sys, shutil
from PIL import Image, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(os.path.dirname(HERE), 'remotion-studio', 'public', 'fonts')
cfg = json.load(open(sys.argv[1], encoding='utf-8')); out = os.path.abspath(sys.argv[2])
cfg.setdefault('dur', 12); cfg.setdefault('ticker', []); cfg.setdefault('key', [0])
fmt = cfg.get('format', '9x16')
os.makedirs(out + '/t', exist_ok=True)
tpl = open(os.path.join(HERE, 'tpl9.html' if fmt == '9x16' else 'tpl16.html'), encoding='utf-8').read()
c = {k: v for k, v in cfg.items() if k not in ('photo', 'format')}
html = tpl.replace('<head><meta charset="utf-8">', '<head><meta charset="utf-8"><script>window.CFG=' + json.dumps(c, ensure_ascii=False) + '</script>', 1)
open(out + '/comp.html', 'w', encoding='utf-8').write(html)
for f in os.listdir(os.path.join(HERE, 'assets')): shutil.copy(os.path.join(HERE, 'assets', f), out)
if not os.path.exists(out + '/fonts'): os.symlink(FONTS, out + '/fonts')
im = Image.open(cfg['photo']).convert('RGB'); W, H = im.size; r = max(1920 / W, 1080 / H)
im = im.resize((round(W * r), round(H * r)), Image.LANCZOS); x = (im.width - 1920) // 2; y = (im.height - 1080) // 2
im.crop((x, y, x + 1920, y + 1080)).filter(ImageFilter.UnsharpMask(2, 80, 2)).save(out + '/hd.jpg', quality=95)
json.dump(cfg, open(out + '/job.json', 'w', encoding='utf-8'), ensure_ascii=False)
vw, vh = (1080, 1920) if fmt == '9x16' else (1920, 1080)
print(f'ready: {out}\n render: cd {HERE} && VW={vw} VH={vh} node r3.mjs {out} video 0 {cfg["dur"]} {out}/vid.mp4')
