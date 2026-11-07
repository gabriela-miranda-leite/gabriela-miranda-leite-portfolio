import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const t = useTranslations('blog');

  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`${post.title} — ${t('listing.read_more')}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        padding: 'var(--space-14)',
        background: 'var(--bg-s)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Tags */}
      {post.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-chip)',
                color: 'var(--accent)',
                background: 'var(--acc-a)',
                padding: 'var(--space-1) var(--space-5)',
                borderRadius: 'var(--radius-pill)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'var(--text-section)',
          fontWeight: 400,
          lineHeight: 'var(--leading-heading)',
          color: 'var(--fg)',
          margin: 0,
          flex: 1,
        }}
      >
        {post.title}
      </p>

      {post.description && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--fg-2)',
            lineHeight: 'var(--leading-sm)',
            margin: 0,
          }}
        >
          {post.description}
        </p>
      )}

      {/* Meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-7)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          color: 'var(--fg-3)',
          letterSpacing: '0.04em',
          marginTop: 'auto',
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <time dateTime={post.date} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {new Date(post.date).toLocaleDateString(post.locale === 'pt' ? 'pt-BR' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
        {post.readingTime && (
          <>
            <span aria-hidden="true">·</span>
            <span style={{ whiteSpace: 'nowrap' }}>{t('reading_time', { minutes: post.readingTime })}</span>
          </>
        )}
      </div>
    </Link>
  );
}
