import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import type { Post } from '@/types/post';

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const t = useTranslations('blog');

  return (
    <header style={{ marginBottom: 'var(--space-16)' }}>
      {/* Back link */}
      <Link
        href="/blog"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          color: 'var(--fg-3)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          marginBottom: 'var(--space-16)',
        }}
      >
        <ArrowLeft size={12} aria-hidden="true" />
        Blog
      </Link>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-10)',
          }}
        >
          {post.tags.map((tag) => (
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
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 6vw, var(--text-title))',
          fontWeight: 400,
          lineHeight: 'var(--leading-tight)',
          color: 'var(--fg)',
          margin: '0 0 var(--space-7)',
          letterSpacing: '-0.02em',
        }}
      >
        {post.title}
      </h1>

      {/* Excerpt / lede */}
      {post.excerpt && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lede)',
            lineHeight: 'var(--leading-lede)',
            color: 'var(--fg-2)',
            margin: '0 0 var(--space-10)',
          }}
        >
          {post.excerpt}
        </p>
      )}

      {/* Meta row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-7)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          color: 'var(--fg-3)',
          letterSpacing: '0.04em',
          paddingBottom: 'var(--space-10)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(post.locale === 'pt' ? 'pt-BR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.readingTime && (
          <>
            <span aria-hidden="true">·</span>
            <span>{t('reading_time', { minutes: post.readingTime })}</span>
          </>
        )}
      </div>
    </header>
  );
}
