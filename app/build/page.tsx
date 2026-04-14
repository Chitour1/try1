import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

const phases = [
  {
    title: 'المرحلة 1: التأسيس التقني',
    items: [
      'إنشاء المشروع بـ Next.js + TypeScript مع هيكلة واضحة للمجلدات.',
      'تفعيل دعم اللغتين العربية والإنجليزية من البداية (RTL/LTR).',
      'إعداد قاعدة PostgreSQL وربطها بنماذج المحتوى الأساسية.',
      'إنشاء معرفات دائمة (slug/PID) لكل صفحة أو كيان.'
    ]
  },
  {
    title: 'المرحلة 2: نماذج البيانات',
    items: [
      'فصل طبقات الهوية المرجعية عن صفحات العرض العامة.',
      'إنشاء جداول: records, pages, relations, events, artifacts, claims.',
      'فرض قيد entity_pattern بحيث يقبل نوعاً واحداً لكل كيان.',
      'إضافة حقول التسميات: preferred, alternative, hidden, deprecated.'
    ]
  },
  {
    title: 'المرحلة 3: واجهات الموقع',
    items: [
      'بناء صفحات رئيسية: الرئيسية، البحث، المعجم، الأخبار، السياسات.',
      'تفعيل بحث بفلترة عرضية (Faceted Search).',
      'إضافة Infobox ديناميكي يقرأ من قاعدة البيانات فقط.',
      'إنشاء صفحات أرشيفية للنسخ المؤرخة (Snapshots).'
    ]
  },
  {
    title: 'المرحلة 4: الحوكمة والصلاحيات',
    items: [
      'تفعيل RBAC بأدوار: Admin / Editor / Reviewer / Viewer.',
      'منع النشر المباشر خارج مسار Draft → Review → Published.',
      'تطبيق إفصاح تضارب المصالح COI على المحررين والمحكمين.',
      'تفعيل Audit Trail غير قابل للتلاعب لكل عملية تعديل أو سحب.'
    ]
  },
  {
    title: 'المرحلة 5: دورة الحياة والإطلاق',
    items: [
      'إيقاف Hard Delete وتعويضه بـ Soft Delete + Tombstone.',
      'توليد Snapshot عند كل تحديث جوهري للحقيقة المرجعية.',
      'منع نشر أي مادة بلا توقيع محكم بشري معتمد.',
      'تشغيل بوابة Milestone Gate كقفل تقني قبل الإطلاق العام.'
    ]
  }
] as const;

const checks = [
  'هل اللغة العربية والإنجليزية تعملان بالتوازي في كل صفحة؟',
  'هل كل كيان يملك معرفاً دائماً واحداً وثابتاً؟',
  'هل محرك البحث يعالج المرادفات والأخطاء الإملائية؟',
  'هل النشر البشري الإلزامي مفعل قبل أي ظهور عام؟',
  'هل روابط الكيانات المتقادمة تحيل تلقائياً للنسخ الأحدث؟'
] as const;

export default function BuildCommandsPage() {
  return (
    <div className="page-wrap build-page">
      <header className="build-hero card">
        <p className="build-eyebrow">خارطة تنفيذ</p>
        <h1>أوامر بناء الموقع الإلكتروني</h1>
        <p>
          هذه الصفحة تحول دليلك الكبير إلى مسار عملي قابل للتنفيذ تدريجياً،
          مع نقاط تحقق واضحة لكل مرحلة.
        </p>
        <div className="build-hero-actions">
          <Link href={ROUTES.home} className="btn-secondary">العودة للرئيسية</Link>
          <Link href={ROUTES.search} className="btn-primary">ابدأ بالبحث</Link>
        </div>
      </header>

      <section className="build-grid" aria-label="مراحل تنفيذ أوامر البناء">
        {phases.map((phase) => (
          <article className="card" key={phase.title}>
            <h2>{phase.title}</h2>
            <ul>
              {phase.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="card" aria-label="قائمة التحقق النهائية">
        <h2>قائمة التحقق النهائية</h2>
        <ul className="checklist">
          {checks.map((item) => (
            <li key={item}>
              <input type="checkbox" aria-label={item} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
