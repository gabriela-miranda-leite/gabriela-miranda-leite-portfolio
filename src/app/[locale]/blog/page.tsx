import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { PostList } from '@/components/blog/PostList';
import { getAllPosts } from '@/lib/posts';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.listing' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gabrielaleite.dev';
  const url = locale === 'pt' ? `${baseUrl}/blog` : `${baseUrl}/en/blog`;
  const ogUrl = `${baseUrl}/og?title=${encodeURIComponent(t('meta_title'))}&subtitle=${encodeURIComponent(t('description'))}`;

  return {
    title: t('meta_title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      title: t('meta_title'),
      description: t('description'),
      url,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('description'),
      images: [ogUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/blog`,
        'en': `${baseUrl}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog.listing' });
  const posts = getAllPosts(locale as 'pt' | 'en');
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  return (
    <main
      id="main-content"
      style={{ paddingTop: 'clamp(2.5rem, 8vw, var(--space-18))', paddingBottom: 'clamp(2.5rem, 8vw, var(--space-18))' }}
    >
      <Container>
        {/* Page heading */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 7vw, var(--text-title))',
              fontWeight: 400,
              lineHeight: 'var(--leading-tight)',
              color: 'var(--fg)',
              margin: '0 0 var(--space-7)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lede)',
              lineHeight: 'var(--leading-lede)',
              color: 'var(--fg-2)',
              margin: 0,
              maxWidth: '560px',
            }}
          >
            {t('description')}
          </p>
        </div>

        <PostList posts={posts} allTags={allTags} />
      </Container>
    </main>
  );
}
