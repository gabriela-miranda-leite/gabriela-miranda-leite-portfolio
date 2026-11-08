import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { RecentPosts } from '@/components/home/RecentPosts';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { getAllPosts } from '@/lib/posts';
import { getRepos } from '@/lib/github';
import { websiteJsonLd } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gabrielaleite.dev';
  const pageTitle = `${t('greeting')} ${t('name')} — ${t('role')}`;
  const ogUrl = `${baseUrl}/og?title=${encodeURIComponent(pageTitle)}&subtitle=${encodeURIComponent(t('bio'))}`;

  return {
    title: pageTitle,
    description: t('bio'),
    openGraph: {
      type: 'website',
      title: pageTitle,
      description: t('bio'),
      url: locale === 'pt' ? baseUrl : `${baseUrl}/en`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: t('bio'),
      images: [ogUrl],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale as 'pt' | 'en').slice(0, 3);
  const repos = (await getRepos()).slice(0, 3);
  const jsonLd = websiteJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Stats />
      <RecentPosts posts={posts} />
      <FeaturedProjects repos={repos} />
    </>
  );
}
