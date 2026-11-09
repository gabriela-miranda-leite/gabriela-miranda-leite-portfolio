'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { CONTACT_EMAIL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export function ContactCTA() {
  const t = useTranslations('about.contact');

  return (
    <section
      className="section-enter"
      aria-labelledby="contact-heading"
      style={{
        paddingTop: 'clamp(2rem, 5vw, 72px)',
        paddingBottom: 'clamp(2.5rem, 8vw, 96px)',
        borderTop: '1px solid var(--border)',
        '--enter-delay': '0.35s',
      } as React.CSSProperties}
    >
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
          {/* Eyebrow */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-eyebrow)', color: 'var(--accent)', letterSpacing: '0.10em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span aria-hidden="true" style={{ display: 'block', width: '28px', height: '1px', background: 'var(--accent)' }} />
            {t('eyebrow')}
            <span aria-hidden="true" style={{ display: 'block', width: '28px', height: '1px', background: 'var(--accent)' }} />
          </div>

          {/* Display heading */}
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, var(--text-title))',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '560px',
              fontOpticalSizing: 'auto' as React.CSSProperties['fontOpticalSizing'],
            }}
          >
            {t('title')}{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>{t('title_em')}</span>
          </h2>

          {/* Subtitle */}
          <p style={{ margin: 0, maxWidth: '420px', color: 'var(--fg-2)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', lineHeight: 1.7 }}>
            {t('subtitle')}
          </p>

          {/* CTA button */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={() => trackEvent({ screen: 'about', action: 'button_clicked', reference: 'Abriu o e-mail de contato' })}
            className="btn btn-primary"
            style={{ marginTop: '4px' }}
          >
            {t('button')}
          </a>
        </div>
      </Container>

      <style>{`
        section[aria-labelledby="contact-heading"] a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
