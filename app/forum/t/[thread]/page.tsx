export default async function Page({ params }: { params: Promise<{ thread: string }> }) {
  const { thread } = await params;
  return <main className="page-wrap"><div className="state-card">موضوع المنتدى: {thread} (Stub).</div></main>;
}
