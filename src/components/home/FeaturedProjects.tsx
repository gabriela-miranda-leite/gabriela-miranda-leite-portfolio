import { useTranslations } from 'next-intl';
import { Code } from '@phosphor-icons/react/dist/ssr';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
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

        <style>{`
          @media (max-width: 639px) {
            .project-grid { grid-template-columns: 1fr !important; }
            .project-card { flex-direction: row !important; align-items: flex-start !important; }
            .project-card-icon { flex-shrink: 0; }
            .project-card-body { flex: 1; min-width: 0; }
          }
        `}</style>
        <div
          className="project-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-10)',
          }}
        >
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} — abre no GitHub`}
              className="project-card"
              style={{
                background: 'var(--bg-s)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-14)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-10)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {/* repo icon */}
              <div
                aria-hidden="true"
                className="project-card-icon"
                style={{
                  width: 'var(--space-17)',
                  height: 'var(--space-17)',
                  background: 'var(--bg-e)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Code size={20} color="var(--fg-2)" aria-hidden="true" />
              </div>

              <div className="project-card-body" style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--text-card)',
                    color: 'var(--fg)',
                    marginBottom: 'var(--space-5)',
                    margin: '0 0 var(--space-5)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {repo.name}
                </p>
                {repo.description && (
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--fg-2)',
                      lineHeight: 'var(--leading-sm)',
                      margin: 0,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {repo.description}
                  </p>
                )}
              </div>

              {(repo.language || repo.topics.length > 0) && (
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    flexWrap: 'wrap',
                    marginTop: 'auto',
                  }}
                >
                  {repo.language && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-chip)',
                        color: 'var(--fg-2)',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        padding: 'var(--space-1) var(--space-5)',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-chip)',
                        color: 'var(--fg-2)',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        padding: 'var(--space-1) var(--space-5)',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
