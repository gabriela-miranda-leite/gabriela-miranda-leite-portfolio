import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      aria-label={t('ariaLabel')}
      style={{
        borderTop: '1px solid var(--border)',
        marginTop: 'var(--space-19)',
        padding: 'var(--space-16) var(--space-13)',
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-10)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--fg-2)',
            fontSize: 'var(--text-logo)',
          }}
        >
          Gabi Miranda
        </span>

        <nav aria-label={t('socialAriaLabel')}>
          <div style={{ display: 'flex', gap: 'var(--space-14)' }}>
            <a
              href="https://github.com/gabriela-miranda-leite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('githubAriaLabel')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-meta)',
                color: 'var(--fg-3)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/gabriela-miranda-leite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('linkedinAriaLabel')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-meta)',
                color: 'var(--fg-3)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
