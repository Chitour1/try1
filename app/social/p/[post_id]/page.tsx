export default async function Page({ params }: { params: Promise<{ post_id: string }> }) {
  const { post_id } = await params;
  return <main className="page-wrap"><div className="state-card">منشور اجتماعي: {post_id} (Stub).</div></main>;
}
