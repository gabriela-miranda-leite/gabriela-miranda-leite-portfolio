'use client';

import { ArrowSquareOut, GitFork, GithubLogo, Star } from '@phosphor-icons/react/dist/ssr';
import { trackEvent } from '@/lib/analytics';
import type { GithubRepo } from '@/types/project';

export interface RepoEmbedLabels {
  cta: string;
  aria: string;
  stars: string;
  forks: string;
  updated: string;
}

interface RepoEmbedCardProps {
  repo: GithubRepo;
  href: string;
  labels: RepoEmbedLabels;
}

const MAX_TOPICS = 5;

export function RepoEmbedCard({ repo, href, labels }: RepoEmbedCardProps) {
  const topics = repo.topics.filter((t) => t.toLowerCase() !== repo.language?.toLowerCase());
  const chips = [...(repo.language ? [repo.language] : []), ...topics.slice(0, MAX_TOPICS)];
  const hasForks = (repo.forks_count ?? 0) > 0;
  const hasStars = repo.stargazers_count > 0;

  return (
    <>
      <style>{`
        .repo-embed:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .repo-embed:hover {
          border-color: var(--accent);
        }

        @media (prefers-reduced-motion: no-preference) {
          .repo-embed {
            transition: border-color 0.15s ease;
          }
        }
      `}</style>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.aria}
        onClick={() =>
          trackEvent({ screen: 'blog', action: 'button_clicked', reference: `Abriu o repositório ${repo.name}` })
        }
        className="repo-embed"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-10)',
          maxWidth: '100%',
          margin: 'var(--space-10) 0',
          padding: 'var(--space-14)',
          background: 'var(--bg-s)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', minWidth: 0 }}>
          <GithubLogo size={20} color="var(--fg-2)" aria-hidden="true" style={{ flexShrink: 0 }} />
          <span
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              color: 'var(--fg-2)',
            }}
          >
            {repo.full_name}
          </span>
          <ArrowSquareOut size={16} color="var(--fg-2)" aria-hidden="true" style={{ flexShrink: 0 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-card)',
              fontWeight: 700,
              color: 'var(--fg)',
              overflowWrap: 'anywhere',
            }}
          >
            {repo.name}
          </span>
          {repo.description && (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-sm)',
                color: 'var(--fg-2)',
              }}
            >
              {repo.description}
            </span>
          )}
        </div>

        {chips.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {chips.map((chip) => (
              <span
                key={chip}
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
                {chip}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-5) var(--space-10)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-chip)',
            color: 'var(--fg-2)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-5) var(--space-10)' }}>
            {hasStars && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Star size={12} aria-hidden="true" />
                {labels.stars}
              </span>
            )}
            {hasForks && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <GitFork size={12} aria-hidden="true" />
                {labels.forks}
              </span>
            )}
            <span>{labels.updated}</span>
          </div>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{labels.cta}</span>
        </div>
      </a>
    </>
  );
}
