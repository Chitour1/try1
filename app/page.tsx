import Link from 'next/link';
import HomeClient from '@/components/HomeClient';
import { getIsMember } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';

export default async function HomePage() {
  const isMember = await getIsMember();

  return (
    <div className="page-wrap">
      <header className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href={ROUTES.home} className="brand" aria-label="الرئيسية">
            <span className="mark" aria-hidden="true">ت</span>
            <span className="wordmark">نادي الترقي</span>
          </Link>
          <span className="copper-line" aria-hidden="true" />
        </div>

        <nav className="global-menu" aria-label="القائمة العامة">
          <Link href={ROUTES.home}>الرئيسية</Link>
          <Link href={ROUTES.forum}>المنتدى</Link>
          <Link href={ROUTES.social}>المنصة</Link>
          <Link href={ROUTES.news}>الأخبار</Link>
          <Link href="/tags">الوسوم</Link>
          <Link href={ROUTES.support}>الدعم</Link>
          <Link href={ROUTES.build}>أوامر البناء</Link>
        </nav>

        <div className="actions">
          <Link href={ROUTES.search} className="icon-button" aria-label="بحث">⌕</Link>
          {isMember ? (
            <>
              <Link href="/notifications" className="icon-button" aria-label="الإشعارات">🔔</Link>
              <Link href="/create" className="icon-button" aria-label="إنشاء">＋</Link>
              <Link href="/u/me" className="icon-button" aria-label="الحساب">👤</Link>
            </>
          ) : (
            <>
              <Link href="/auth?return=%2F" className="btn-secondary">تسجيل الدخول</Link>
              <Link href="/auth?return=%2F" className="btn-primary">إنشاء حساب</Link>
              <Link href={ROUTES.menu} className="icon-button" aria-label="القائمة">☰</Link>
            </>
          )}
        </div>
      </header>

      <HomeClient isMember={isMember} />

      {isMember ? (
        <nav className="footer" aria-label="التنقل السفلي للأعضاء">
          <Link href={ROUTES.forum}>المنتدى</Link>
          <Link href={ROUTES.social}>المنصة</Link>
          <Link href={ROUTES.news}>الأخبار</Link>
          <Link href={ROUTES.notifications}>الإشعارات</Link>
          <Link href={ROUTES.account}>الحساب</Link>
        </nav>
      ) : null}
    </div>
  );
}
