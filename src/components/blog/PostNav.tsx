import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';

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
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            textDecoration: 'none',
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
              letterSpacing: '0.06em',
            }}
          >
            <ArrowLeft size={12} aria-hidden="true" />
            {t('prev')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'var(--text-card)',
              color: 'var(--fg)',
              lineHeight: 'var(--leading-card)',
            }}
          >
            {prev.title}
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={`/blog/${next.slug}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            textDecoration: 'none',
            textAlign: prev ? 'right' : 'left',
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
              letterSpacing: '0.06em',
            }}
          >
            {t('next')}
            <ArrowRight size={12} aria-hidden="true" />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'var(--text-card)',
              color: 'var(--fg)',
              lineHeight: 'var(--leading-card)',
            }}
          >
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
