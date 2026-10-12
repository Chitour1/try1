# موثّق — قوالب الأخبار (عاجل / خبر)

ملفات جاهزة لإنتاج مقطع خبر لقناة «موثّق» دون إعادة كتابة القالب.

- `tpl9.html` القالب العمودي 1080×1920 (الأساسي)، `tpl16.html` العرضي 1920×1080.
- `make.py` يبني مجلد المهمة من ملف `job.json` (الصورة تُقص وتُكبَّر إلى 1920×1080 تلقائياً).
- `r3.mjs` يرسم الإطارات بـ Chromium ويمررها إلى ffmpeg. `snd.py` + `fxlib.py` للصوت.
- `assets/` الختم (فاتح وداكن) وحبيبات الصورة. الخطوط من `../remotion-studio/public/fonts`.

## الاستعمال

```bash
git clone --depth 1 -b muwathaq-studio https://github.com/Chitour1/try1 repo && cd repo/muwathaq
npm i puppeteer-core --silent && pip install --break-system-packages numpy scipy pillow -q
python3 make.py job.json /tmp/job1          # يطبع أمر الرسم
VW=1080 VH=1920 node r3.mjs /tmp/job1 video 0 12 /tmp/job1/vid.mp4
python3 snd.py /tmp/job1
ffmpeg -y -i /tmp/job1/vid.mp4 -i /tmp/job1/mix.wav -map 0:v -map 1:a -c:v copy \
  -af "alimiter=limit=0.89:level=false,loudnorm=I=-14:TP=-1.5:LRA=9" -ar 48000 -c:a aac -b:a 192k -movflags +faststart -shortest out.mp4
```

قبل الرسم الكامل: `node r3.mjs /tmp/job1 frames 0.6,3.5,8` ثم افحص `/tmp/job1/t/`.

## مثال job.json (عاجل)

```json
{"format":"9x16","breaking":true,"color":"#C8102E","label":"عاجل","date":"12 أكتوبر 2026",
 "credit":"الصورة: AFP","source":"المصدر: بيان مشترك لـ 29 دولة",
 "words":["29","دولة","بينها","بريطانيا","وأمريكا","تتهم","إيران","بالتورط","في","حادث","قاعدة","فيرفورد"],
 "key":[0,1],"dur":12,"ticker":["29 دولة بينها بريطانيا وأمريكا تتهم إيران بالتورط في حادث قاعدة فيرفورد"],
 "photo":"/path/photo.jpg","focus":[1240,300]}
```

خبر غير عاجل: `"breaking":false` ولون القسم واسمه (سياسة #1D4E89، ثقافة #6B3FA0، دين #0B6E4F، محلي #9A5600، عالمي #0E6E7E، عربي #A13D24، تقارير #3E4C5E) — يظهر شريط القناة بدل الشريط الإخباري.
`focus` نقطة الاقتراب الأخير على الصورة بمقاس 1920×1080 (للعاجل فقط؛ احذفه لإلغاء الاقتراب). مدة 12 ثانية تكفي لعنوان حتى 14 كلمة تقريباً.
