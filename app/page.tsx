import Link from 'next/link';
import { referenceIndexIntro, referencePages } from '@/lib/reference-content';

export default function HomePage() {
  return (
    <main className="ref-wrap">
      <section className="hero-card">
        <p className="hero-tag">الموقع المرجعي الدائم</p>
        <h1>موسوعة التأسيس المرجعي — فهرس الحزم والوثائق الحاكمة</h1>
        <p>{referenceIndexIntro}</p>
      </section>

      <section className="index-grid" aria-label="فهرس الصفحات">
        {referencePages.map((page) => (
          <Link key={page.slug} href={`/reference/${page.slug}`} className="index-card">
            <h2>{page.navTitle}</h2>
            <p>{page.title}</p>
            <span>فتح الصفحة ←</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
