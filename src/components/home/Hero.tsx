import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        paddingTop: 'clamp(3rem, 10vw, 8rem)',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        maxWidth: '100%',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-eyebrow)',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '0.75rem',
        }}
      >
        {t('role')}
      </p>

      <h1
        id="hero-heading"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 10vw, var(--text-hero))',
          lineHeight: 'var(--leading-tight)',
          color: 'var(--fg)',
          marginBottom: '1.5rem',
          maxWidth: '14ch',
        }}
      >
        {t('greeting')}{' '}
        <span style={{ color: 'var(--accent)' }}>{t('name')}</span>
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-lede)',
          lineHeight: 'var(--leading-lede)',
          color: 'var(--fg-2)',
          maxWidth: '48ch',
          marginBottom: '2.5rem',
        }}
      >
        {t('bio')}
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/projects">
          <Button variant="primary">{t('cta.projects')}</Button>
        </Link>
        <Link href="/blog">
          <Button variant="ghost">{t('cta.blog')}</Button>
        </Link>
      </div>
    </section>
  );
}
