'use client';

import { useId } from 'react';
import { ArrowSquareOut, GitFork, GithubLogo, Star } from '@phosphor-icons/react/dist/ssr';
import { trackEvent } from '@/lib/analytics';
import { useFreshness } from '@/lib/freshness';
import { FreshBadge } from './FreshBadge';
import type { GithubRepo } from '@/types/project';

export interface RepoCardLabels {
  cta: string;
  aria: string;
  stars: string;
  forks: string;
  updated: string;
}

interface RepoCardProps {
  repo: GithubRepo;
  href: string;
  labels: RepoCardLabels;
  /** Where the click is tracked from. Defaults to the blog (embedded in a post). */
  screen?: 'blog' | 'projects' | 'home';
  /** Drop the vertical margin so the card sits flush in a grid. */
  fill?: boolean;
}

const MAX_TOPICS = 5;

export function RepoCard({ repo, href, labels, screen = 'blog', fill = false }: RepoCardProps) {
  const topics = repo.topics.filter((t) => t.toLowerCase() !== repo.language?.toLowerCase());
  const chips = [...(repo.language ? [repo.language] : []), ...topics.slice(0, MAX_TOPICS)];
  const hasForks = (repo.forks_count ?? 0) > 0;
  const hasStars = repo.stargazers_count > 0;
  const fresh = useFreshness(repo.created_at, repo.pushed_at);
  const badgeId = useId();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={labels.aria}
      aria-describedby={fresh ? badgeId : undefined}
      onClick={() =>
        trackEvent({
          screen,
          action: 'button_clicked',
          reference: screen === 'blog' ? `Abriu o repositório ${repo.name}` : `Abriu o projeto ${repo.name}`,
        })
      }
      className={fill ? 'repo-card repo-card--fill' : 'repo-card'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-10)',
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
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-5)' }}>
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
          {fresh && <FreshBadge kind={fresh} id={badgeId} />}
        </div>
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
          marginTop: 'auto',
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
  );
}
