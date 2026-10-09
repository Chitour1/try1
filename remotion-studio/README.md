# استوديو ريموشن للمونتاج

مشروع مستقل داخل المستودع، جاهز للتعامل معه عبر Claude Code. لا يغيّر تطبيق Next.js الموجود في جذر المستودع.

## أول تشغيل في بيئة Node.js

```bash
cd remotion-studio
npm install --no-audit --no-fund
npm run dev
```

تفتح واجهة Remotion Studio لمعاينة وتعديل المشاهد. تشغيل الواجهة يحتاج خادمًا وبيئة تدعم Node.js؛ فتح GitHub وحده لا يشغّلها.

## تصدير فيديو MP4

```bash
cd remotion-studio
npm run render
```

يُحفظ الملف في `remotion-studio/out/video.mp4`.

## تغيير محتوى الفيديو

المشهد التجريبي هو `ArabicIntro`. يمكن تغيير العنوان والنص الفرعي واللون من `src/Root.tsx` أو تمرير خصائص عند التصيير:

```bash
npx remotion render src/index.ts ArabicIntro out/custom.mp4 --props='{"title":"عنوان الفيديو","subtitle":"نص ثانوي","accentColor":"#58D9C4"}'
```

عند استخدام Claude Code، اختر المستودع `try1` ثم اطلب منه العمل **داخل `remotion-studio` فقط**. تعليماته الدائمة موجودة في `CLAUDE.md` داخل هذا المجلد.

## ملاحظات

- المكتبات محددة بإصدارات متطابقة من Remotion لتجنب التعارض.
- الملفات الناتجة واعتماديات `node_modules` غير محفوظة على GitHub؛ تُنشأ أثناء التثبيت والتصيير.
- الفحص الآلي في GitHub Actions يحاول تثبيت الاعتماديات والتحقق من TypeScript وتصدير عينة.
- إضافة Remotion الرسمية داخل حساب Claude نفسه، إن رغبت بها، إعداد منفصل عن تثبيت المكتبة في المستودع.
