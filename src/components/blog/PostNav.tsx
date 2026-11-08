'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { trackEvent } from '@/lib/analytics';

interface PostNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function PostNav({ prev, next }: PostNavProps) {
  const t = useTranslations('blog');

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Navegação entre posts"
      className="post-nav"
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 'var(--space-16)',
        marginTop: 'var(--space-18)',
        display: 'grid',
        gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr',
        gap: 'var(--space-10)',
      }}
    >
      {prev && (
        <Link
          href={`/blog/${prev.slug}`}
          onClick={() => trackEvent('post_navigate', { direction: 'prev' })}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            textDecoration: 'none',
            background: 'var(--bg-s)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-12)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-meta)',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <ArrowLeft size={12} aria-hidden="true" />
            {t('prev')}
          </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              color: 'var(--fg)',
              lineHeight: 'var(--leading-card)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {prev.title}
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={`/blog/${next.slug}`}
          onClick={() => trackEvent('post_navigate', { direction: 'next' })}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            textDecoration: 'none',
            textAlign: prev ? 'right' : 'left',
            background: 'var(--bg-s)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-12)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              justifyContent: prev ? 'flex-end' : 'flex-start',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-meta)',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('next')}
            <ArrowRight size={12} aria-hidden="true" />
          </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              color: 'var(--fg)',
              lineHeight: 'var(--leading-card)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
