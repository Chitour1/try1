import Link from 'next/link';
import { notFound } from 'next/navigation';
import { referencePages } from '@/lib/reference-content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return referencePages.map((page) => ({ slug: page.slug }));
}

export default async function ReferencePage({ params }: Props) {
  const { slug } = await params;
  const page = referencePages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="ref-wrap">
      <header className="ref-header">
        <Link href="/" className="ref-back">← العودة إلى الفهرس الرئيسي</Link>
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
      </header>

      <article className="ref-article">
        <pre>{page.content}</pre>
      </article>
    </main>
  );
}
