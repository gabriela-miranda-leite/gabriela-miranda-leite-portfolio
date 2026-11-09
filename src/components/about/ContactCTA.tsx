'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export function ContactCTA() {
  const t = useTranslations('about.contact');

  const linkStyle: React.CSSProperties = {
    color: 'var(--fg-2)',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
  };

  return (
    <section
      className="section-enter contact-signature"
      aria-labelledby="contact-heading"
      style={{
        paddingTop: 'clamp(2rem, 5vw, 72px)',
        paddingBottom: 'clamp(2.5rem, 8vw, 96px)',
        borderTop: '1px solid var(--border)',
        '--enter-delay': '0.35s',
      } as React.CSSProperties}
    >
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.5rem, 3vw, var(--text-section))',
              fontWeight: 400,
              lineHeight: 'var(--leading-heading)',
              color: 'var(--fg)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>

          <p
            style={{
              margin: 0,
              maxWidth: '480px',
              color: 'var(--fg-2)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body)',
              lineHeight: 1.7,
            }}
          >
            {t('body')}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body)',
              color: 'var(--fg-2)',
              marginTop: '4px',
            }}
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => trackEvent({ screen: 'about', action: 'button_clicked', reference: 'Abriu o e-mail de contato' })}
              className="contact-signature-link"
              style={linkStyle}
            >
              {CONTACT_EMAIL}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-signature-link"
              style={linkStyle}
            >
              {t('linkedinLabel')}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-signature-link"
              style={linkStyle}
            >
              {t('githubLabel')}
            </a>
          </div>
        </div>
      </Container>

      <style>{`
        .contact-signature-link:hover,
        .contact-signature-link:focus-visible {
          color: var(--fg);
        }
        .contact-signature-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
