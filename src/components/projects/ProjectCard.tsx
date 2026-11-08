import { Code, Star, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import type { GithubRepo } from '@/types/project';

interface ProjectCardProps {
  repo: GithubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <a
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
        transition: 'border-color 0.15s',
      }}
    >
      {/* Icon */}
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

      {/* Body */}
      <div className="project-card-body" style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-5)',
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: 'var(--text-card)',
              color: 'var(--fg)',
              margin: 0,
              fontFamily: 'var(--font-sans)',
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {repo.name}
          </p>
          <ArrowSquareOut
            size={14}
            color="var(--fg-3)"
            aria-hidden="true"
            className="project-card-arrow"
            style={{ flexShrink: 0, transition: 'color 0.18s ease' }}
          />
        </div>

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

      {/* Footer: tags + stars */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-5)',
          marginTop: 'auto',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
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

        {repo.stargazers_count > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-chip)',
              color: 'var(--fg-3)',
            }}
          >
            <Star size={12} aria-hidden="true" />
            <span>{repo.stargazers_count}</span>
          </div>
        )}
      </div>
    </a>
  );
}
