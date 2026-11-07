import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section
      aria-labelledby="hero-heading"
      style={{ paddingTop: 'clamp(3rem, 8vw, 5.75rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
    >
      <Container>
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-6)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-meta)',
            color: 'var(--accent)',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-14)',
          }}
        >
          <span
            aria-hidden="true"
            style={{ display: 'block', width: '28px', height: '1px', background: 'var(--accent)', flexShrink: 0 }}
          />
          {t('role')}
        </div>

        {/* Heading — two lines */}
        <h1
          id="hero-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 10vw, var(--text-hero))',
            letterSpacing: '-0.025em',
            lineHeight: 0.91,
            fontOpticalSizing: 'auto',
            margin: `0 0 var(--space-14)`,
          }}
        >
          <span
            style={{
              display: 'block',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--fg-2)',
            }}
          >
            {t('greeting')}
          </span>
          <span
            style={{
              display: 'block',
              fontWeight: 800,
              color: 'var(--fg)',
            }}
          >
            {t('name')}
          </span>
        </h1>

        {/* Bio */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-logo)',
            lineHeight: 'var(--leading-lede)',
            color: 'var(--fg-2)',
            maxWidth: '480px',
            margin: '0 0 2rem',
          }}
        >
          {t('bio')}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 'var(--space-7)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/projects"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              padding: 'var(--space-7) var(--space-13)',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              display: 'inline-block',
            }}
          >
            {t('cta.projects')}
          </Link>
          <Link
            href="/blog"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--fg-2)',
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              padding: '11px var(--space-13)',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              display: 'inline-block',
            }}
          >
            {t('cta.blog')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
