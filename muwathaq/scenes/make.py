"""Build a render-ready job for a «موثّق» multi-scene INFOGRAPHIC video.
Usage: python3 make.py job.json OUTDIR
job.json: {"color","label","date","scenes":[...]}  scene types and keys: see README.md"""
import json, os, sys, shutil, subprocess, re
from PIL import Image, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
FONTS = os.path.join(os.path.dirname(ROOT), 'remotion-studio', 'public', 'fonts')
job = json.load(open(sys.argv[1], encoding='utf-8')); out = os.path.abspath(sys.argv[2]); os.makedirs(out + '/t', exist_ok=True)
def words(s):
    txt = ' '.join(str(v) for k, v in s.items() if isinstance(v, str) and k not in ('type', 'source', 'photo', 'img', 'credit')) + ' ' + \
          ' '.join(str(r.get('label', '')) + ' ' + str(r.get('text', '')) for r in s.get('rows', []) + s.get('items', [])) + ' ' + ' '.join(s.get('points', [])) + ' ' + ' '.join(str(r.get('word', '')) + ' ' + str(r.get('forms', '')) for r in s.get('items', []) if isinstance(r, dict))
    return len(re.findall(r'\S+', txt))
BASE = {'title': 2.2, 'map': 3.0, 'bignum': 2.6, 'bars': 1.8, 'timeline': 1.2, 'summary': 1.2, 'headline': 2.4, 'point': 2.2, 'quote': 2.4, 'pair': 4.2, 'verdict': 4.6}
t = 1.0
pts = [s for s in job['scenes'] if s['type'] == 'point']
for n, s in enumerate(pts): s['n'], s['of'] = n + 1, len(pts)
for i, s in enumerate(job['scenes']):
    if s.get('photo'):
        im = Image.open(s['photo']).convert('RGB'); W, H = im.size; r = max(1920 / W, 1080 / H)
        im = im.resize((round(W * r), round(H * r)), Image.LANCZOS); x = (im.width - 1920) // 2; y = (im.height - 1080) // 2
        im.crop((x, y, x + 1920, y + 1080)).filter(ImageFilter.UnsharpMask(2, 80, 2)).save(f'{out}/img{i}.jpg', quality=92); s['img'] = f'img{i}.jpg'
    if s['type'] == 'map':
        spec = os.path.join(out, f'map{i}.spec.json'); mo = os.path.join(out, f'map{i}.json')
        json.dump({k: s[k] for k in ('bbox', 'pin', 'labels') if k in s} | {'w': 1000, 'h': 1000}, open(spec, 'w', encoding='utf-8'), ensure_ascii=False)
        subprocess.run(['node', os.path.join(HERE, 'gen_map.mjs'), spec, mo], check=True, cwd=HERE)
        s['mapdata'] = json.load(open(mo, encoding='utf-8'))
    extra = len(s.get('rows', [])) * .55 + len(s.get('items', [])) * .7 + len(s.get('points', [])) * .9
    s['dur'] = float(s.get('dur') or round(max(3.5, BASE.get(s['type'], 2) + extra + words(s) / 3.8), 2))
    s['start'] = round(t, 2); t += s['dur']
job['total'] = round(t + .7, 2)
html = open(os.path.join(HERE, 'tpl.html'), encoding='utf-8').read().replace('<head><meta charset="utf-8">',
       '<head><meta charset="utf-8"><script>window.CFG=' + json.dumps(job, ensure_ascii=False) + '</script>', 1)
open(out + '/comp.html', 'w', encoding='utf-8').write(html)
for f in os.listdir(os.path.join(ROOT, 'assets')): shutil.copy(os.path.join(ROOT, 'assets', f), out)
AM = os.path.join(os.path.dirname(ROOT), 'node_modules', '@fontsource', 'amiri', 'files', 'amiri-arabic-700-normal.woff2')
if os.path.exists(AM): shutil.copy(AM, out + '/amiri-700.woff2')
if not os.path.exists(out + '/fonts'): os.symlink(FONTS, out + '/fonts')
json.dump({k: v for k, v in job.items()} | {'scenes': [{k: v for k, v in s.items() if k != 'mapdata'} for s in job['scenes']]},
          open(out + '/job.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('scenes:', [(s['type'], s['start'], s['dur']) for s in job['scenes']], 'total', job['total'])
print(f'render: cd {ROOT} && VW=1080 VH=1920 node r3.mjs {out} video 0 {job["total"]} {out}/vid.mp4')
