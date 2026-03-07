export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <main className="page-wrap"><div className="state-card">الملف الشخصي @{username} (Stub).</div></main>;
}
