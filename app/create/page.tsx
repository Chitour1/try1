import { redirect } from 'next/navigation';
import { getIsMember } from '@/lib/auth';

export default async function Page() {
  if (!(await getIsMember())) redirect('/auth?return=%2Fcreate');
  return <main className="page-wrap"><div className="state-card">إنشاء (Stub).</div></main>;
}
