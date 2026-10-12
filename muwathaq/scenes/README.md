# موثّق — محرك المشاهد (إنفوغراف + شرائح)

فيديو واحد من عدة مشاهد: ختم الثانية الواحدة، ثم المشاهد بالترتيب مع مسح من اليمين، ثم ختم الخاتمة.
الإطار ثابت: وسم القسم والتاريخ أعلى اليمين، الختم أعلى اليسار، سلسلة السند (تقدّم المشاهد)، شريط القناة أسفل.
المدة تُحسب تلقائياً من طول النص (أو `dur` لكل مشهد). بلا راوٍ: نص وموسيقى.

```bash
cd repo/muwathaq && npm i puppeteer-core world-atlas@2.0.2 topojson-client@3.1.0 d3-geo@3.1.1 --silent
python3 scenes/make.py job.json /tmp/j      # يطبع المدة وأمر الرسم
python3 scenes/snd.py /tmp/j
VW=1080 VH=1920 node r3.mjs /tmp/j frames 3,9,15   # فحص
VW=1080 VH=1920 node r3.mjs /tmp/j video 0 <total> /tmp/j/vid.mp4   # ثم الدمج بـ ffmpeg كما في القالب الأساسي
```

## job.json
`{"color":"#0E6E7E","label":"عالمي","date":"أكتوبر 2026","scenes":[...]}`

### أنواع المشاهد
- `title`: `kicker`, `title`, `sub` — عنوان الموضوع وسؤاله.
- `map`: `bbox [minLon,minLat,maxLon,maxLat]`, `pin [lon,lat]`, `pinLabel`, `labels [[نص,lon,lat]...]`, `sea [أسماء البحار]`, `highlight [أسماء دول بالإنجليزية كما في Natural Earth]`, `zoom`, `fact`, `source` — خريطة حقيقية من Natural Earth (world-atlas 10m).
- `bignum`: `title`, `value` (رقم يعدّ), `suffix`/`prefix`, `unit`, `meaning`, `source`.
- `bars`: `title`, `rows [{label,value,display,hi}]` (مقياس واحد من الصفر), `note`, `source`.
- `timeline`: `title`, `items [{date,text}]`, `source`.
- `summary`: `title`, `points [..]`.
- `headline` (للشرائح): `title`, `photo`, `credit`, `source` — صورة وعنوان.
- `point` (للشرائح): `title`, `body` (≤3 أسطر), `date`, `source`, `photo` اختياري — يُرقَّم تلقائياً «1 من 4».
- `quote`: `text`, `name`, `role`, `source`.

مثال كامل للإنفوغراف: `examples/hormuz.json`، وللشرائح: `examples/fairford-slides.json`.
