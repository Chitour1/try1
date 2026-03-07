'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ROUTES, MEMBER_ROUTES } from '@/lib/routes';
import type { HomeSummary } from '@/lib/types';

type Props = { isMember: boolean };

function gateHref(href: string, isMember: boolean): string {
  if (isMember || !MEMBER_ROUTES.has(href)) {
    return href;
  }
  return `${ROUTES.auth}?return=${encodeURIComponent(href)}`;
}

export default function HomeClient({ isMember }: Props) {
  const [data, setData] = useState<HomeSummary | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    fetch('/api/home/summary', { credentials: 'include' })
      .then((res) => res.json())
      .then((payload: HomeSummary) => {
        if (!canceled) {
          setData(payload);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!canceled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      canceled = true;
    };
  }, []);

  const updates = useMemo(() => {
    if (!data) return [];
    const seen = new Set<string>();
    return [...data.updates]
      .sort((a, b) => Number(Boolean(b.pinned || b.featured)) - Number(Boolean(a.pinned || a.featured)))
      .filter((row) => {
        if (row.hidden) return false;
        if (seen.has(row.target_url)) return false;
        seen.add(row.target_url);
        return true;
      })
      .slice(0, 6);
  }, [data]);

  return (
    <>
      <section className="hero-grid" aria-label="الأجنحة الثلاثة">
        <article className="card">
          <h2>المنتدى</h2>
          <p>حوارات مرتبة حسب الأقسام والوسوم.</p>
          <Link href={ROUTES.forum}>فتح المنتدى</Link>
        </article>
        <article className="card">
          <h2>المنصة</h2>
          <p>منشورات قصيرة وتفاعلات مباشرة.</p>
          <Link href={ROUTES.social}>فتح المنصة</Link>
        </article>
        <article className="card">
          <h2>الأخبار</h2>
          <p>آخر المستجدات والتحرير الرسمي.</p>
          <Link href={ROUTES.news}>فتح الأخبار</Link>
        </article>
      </section>

      {loading && <div className="state-card">جارٍ التحميل… إن استمر الأمر أعد المحاولة. <button type="button">إعادة المحاولة</button></div>}
      {error && <div className="state-card">حدث خطأ أثناء التحميل. <button type="button" onClick={() => window.location.reload()}>إعادة المحاولة</button></div>}
      {!loading && !error && data && (
        <div className="layout-main">
          <main>
            <div className="section-title"><h2>أحدث محتوى</h2></div>
            <section className="latest-grid">
              <article className="card">
                <h3>آخر موضوع</h3>
                <Link href={data.latestThread.href}>{data.latestThread.title}</Link>
                <p>{data.latestThread.meta}</p>
              </article>
              <article className="card">
                <h3>آخر منشور</h3>
                <Link href={data.latestPost.href}>{data.latestPost.title}</Link>
                <p>{data.latestPost.meta}</p>
                <div>
                  <Link href={gateHref('/create', isMember)}>إضافة منشور</Link>
                </div>
              </article>
              <article className="card">
                <h3>آخر خبر</h3>
                <Link href={data.latestArticle.href}>{data.latestArticle.title}</Link>
                <p>{data.latestArticle.meta}</p>
              </article>
            </section>
          </main>

          <aside className="card" aria-label="تحديثات عبر المنصات">
            <h2>تحديثات عبر المنصات</h2>
            {updates.length === 0 ? <p>لا يوجد شيء هنا بعد. <Link href={ROUTES.search}>استكشف</Link></p> : updates.map((row) => (
              <div className="updates-row" key={row.id}>
                <div>
                  <div>{row.type}</div>
                  <div>{row.actor} · <span dir="ltr">{row.time}</span></div>
                  <Link href={row.target_url}>{row.target_title}</Link>
                </div>
                <Link href={row.target_url}>فتح</Link>
              </div>
            ))}
          </aside>
        </div>
      )}

      <footer className="footer">
        <Link href={ROUTES.terms}>الشروط</Link>
        <Link href={ROUTES.privacy}>الخصوصية</Link>
        <Link href={ROUTES.community}>إرشادات المجتمع</Link>
        <Link href={ROUTES.support}>الدعم</Link>
        <Link href={ROUTES.contact}>اتصل بنا</Link>
      </footer>
    </>
  );
}
