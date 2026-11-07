import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      aria-label={t('ariaLabel')}
      style={{
        borderTop: '1px solid var(--border)',
        marginTop: '88px',
        padding: '40px 24px',
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
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--fg-2)',
            fontSize: '15px',
          }}
        >
          Gabi Miranda
        </span>

        <nav aria-label={t('socialAriaLabel')}>
          <div style={{ display: 'flex', gap: '28px' }}>
            <a
              href="https://github.com/gabriela-miranda-leite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('githubAriaLabel')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
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
                fontSize: '11px',
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
