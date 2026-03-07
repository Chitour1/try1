import { redirect } from 'next/navigation';
import { getIsMember } from '@/lib/auth';

export default async function Page() {
  if (!(await getIsMember())) redirect('/auth?return=%2Fnotifications');
  return <main className="page-wrap"><div className="state-card">الإشعارات (Stub).</div></main>;
}
