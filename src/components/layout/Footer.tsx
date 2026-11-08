'use client';

import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';
import { SOCIAL_LINKS } from '@/lib/constants';

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
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('githubAriaLabel')}
              onClick={() => trackEvent({ screen: 'home', action: 'button_clicked', reference: 'Abriu o GitHub (rodapé)' })}
              className="footer-link"
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
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('linkedinAriaLabel')}
              onClick={() => trackEvent({ screen: 'home', action: 'button_clicked', reference: 'Abriu o LinkedIn (rodapé)' })}
              className="footer-link"
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

      <p
        style={{
          maxWidth: '1080px',
          margin: 'var(--space-10) auto 0',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          color: 'var(--fg-3)',
          letterSpacing: '0.04em',
        }}
      >
        {t('copyright', { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
