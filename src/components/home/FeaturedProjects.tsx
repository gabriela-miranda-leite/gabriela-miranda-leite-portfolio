'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { trackEvent } from '@/lib/analytics';
import type { GithubRepo } from '@/types/project';

interface FeaturedProjectsProps {
  repos: GithubRepo[];
}

export function FeaturedProjects({ repos }: FeaturedProjectsProps) {
  const t = useTranslations('home');

  if (repos.length === 0) return null;

  return (
    <section
      aria-labelledby="projects-heading"
      style={{ paddingTop: 'var(--space-18)', paddingBottom: 'var(--space-18)' }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 'var(--space-10)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-16)',
          }}
        >
          <h2
            id="projects-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'var(--text-section)',
              fontWeight: 400,
              color: 'var(--fg)',
              margin: 0,
            }}
          >
            {t('projects')}
          </h2>
          <Link
            href="/projects"
            onClick={() => trackEvent({ screen: 'home', action: 'button_clicked', reference: 'Abriu todos os projetos' })}
            className="see-all-link"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-meta)',
              color: 'var(--accent)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {t('see_all')}
          </Link>
        </div>

        <div className="grid-projects">
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} screen="home" />
          ))}
        </div>
      </Container>
    </section>
  );
}
