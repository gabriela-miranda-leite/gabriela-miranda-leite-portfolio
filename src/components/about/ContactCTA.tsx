'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { CONTACT_EMAIL } from '@/lib/constants';

export function ContactCTA() {
  const t = useTranslations('about.contact');

  return (
    <section
      aria-labelledby="contact-heading"
      style={{
        paddingTop: 'clamp(2rem, 5vw, var(--space-18))',
        paddingBottom: 'clamp(2.5rem, 8vw, var(--space-18))',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      <Container>
        <h2
          id="contact-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 5vw, var(--text-title))',
            fontWeight: 400,
            lineHeight: 'var(--leading-heading)',
            color: 'var(--fg)',
            margin: '0 0 var(--space-16)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('title')}
        </h2>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            padding: 'var(--space-7) var(--space-13)',
            borderRadius: 'var(--radius-pill)',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t('button')}
        </a>
      </Container>

      <style>{`
        #contact-heading ~ a:focus-visible,
        section[aria-labelledby="contact-heading"] a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
