import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/layout/Container';
import { PostHeader } from '@/components/blog/PostHeader';
import { Prose } from '@/components/blog/Prose';
import { PostNav } from '@/components/blog/PostNav';
import { getAllPosts, getPost } from '@/lib/posts';
import { blogPostingJsonLd } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ['pt', 'en'] as const;
  const paths: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      paths.push({ locale, slug: post.slug });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale as 'pt' | 'en');

  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gabrielaleite.dev';
  const url =
    locale === 'pt' ? `${baseUrl}/blog/${slug}` : `${baseUrl}/en/blog/${slug}`;
  const ogUrl = `${baseUrl}/og?slug=${slug}&locale=${locale}`;

  return {
    title: `${post.title} — Gabi Miranda`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
      publishedTime: post.date,
      authors: ['Gabriela Miranda Leite'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/blog/${slug}`,
        'en': `${baseUrl}/en/blog/${slug}`,
      },
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug, locale as 'pt' | 'en');
  if (!post) notFound();

  const allPosts = getAllPosts(locale as 'pt' | 'en');
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const next = idx > 0 ? allPosts[idx - 1] : null;

  const jsonLd = blogPostingJsonLd({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    slug,
    locale,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        id="main-content"
        style={{ paddingTop: 'var(--space-18)', paddingBottom: 'var(--space-18)' }}
      >
        <Container>
          <div style={{ maxWidth: '72ch' }}>
            <PostHeader post={post} />
            <Prose>
              <MDXRemote source={post.content} />
            </Prose>
            <PostNav prev={prev} next={next} />
          </div>
        </Container>
      </main>
    </>
  );
}
