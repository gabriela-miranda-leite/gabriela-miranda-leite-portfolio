import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getPinnedRepos, getRepos } from '@/lib/github';

export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gabrielaleite.dev';
  const url = locale === 'pt' ? `${baseUrl}/projects` : `${baseUrl}/en/projects`;
  const ogUrl = `${baseUrl}/og`;

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
        'pt-BR': `${baseUrl}/projects`,
        en: `${baseUrl}/en/projects`,
      },
    },
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'projects' });

  // Try pinned repos first; fall back to all repos if list is empty
  let repos = await getPinnedRepos();
  if (repos.length === 0) {
    repos = await getRepos();
  }

  return (
    <main
      id="main-content"
      style={{
        paddingTop: 'clamp(2.5rem, 8vw, var(--space-18))',
        paddingBottom: 'clamp(2.5rem, 8vw, var(--space-18))',
      }}
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

        {repos.length > 0 ? (
          <div className="grid-projects">
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body)',
              color: 'var(--fg-2)',
            }}
          >
            {t('empty')}
          </p>
        )}
      </Container>
    </main>
  );
}
