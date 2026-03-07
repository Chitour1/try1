export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  const { article } = await params;
  return <main className="page-wrap"><div className="state-card">خبر: {article} (Stub).</div></main>;
}
