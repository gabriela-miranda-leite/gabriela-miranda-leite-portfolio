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
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '40px',
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} — abre no GitHub`}
              style={{
                background: 'var(--bg-s)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {/* repo icon */}
              <div
                aria-hidden="true"
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'var(--bg-e)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Code size={20} color="var(--fg-2)" aria-hidden="true" />
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--text-card)',
                    color: 'var(--fg)',
                    marginBottom: '8px',
                    margin: '0 0 8px',
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
                    gap: '6px',
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
                        padding: '3px 8px',
                        borderRadius: '5px',
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
                        padding: '3px 8px',
                        borderRadius: '5px',
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
