'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { AboutArt } from './AboutArt';
import { SOCIAL_LINKS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export function AboutHero() {
  const t = useTranslations('about.hero');

  return (
    <section
      className="section-enter"
      aria-labelledby="about-heading"
      style={{ paddingTop: 'clamp(2.5rem, 8vw, 5rem)', paddingBottom: 'clamp(2.5rem, 6vw, 4.5rem)', '--enter-delay': '0.05s' } as React.CSSProperties}
    >
      <Container>
        <div className="about-hero-grid">
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
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
              }}
            >
              <span aria-hidden="true" style={{ display: 'block', width: '28px', height: '1px', background: 'var(--accent)', flexShrink: 0 }} />
              {t('eyebrow')}
            </div>

            {/* Heading */}
            <h1
              id="about-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 8vw, 72px)',
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
                fontOpticalSizing: 'auto' as React.CSSProperties['fontOpticalSizing'],
                margin: 0,
              }}
            >
              <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 300, color: 'var(--fg-2)' }}>
                {t('title_line1')}
              </span>
              <span style={{ display: 'block', fontWeight: 800, color: 'var(--fg)' }}>
                {t('title_line2')}
              </span>
            </h1>

            {/* Bio — two paragraphs */}
            <p style={{ margin: 0, maxWidth: '520px', color: 'var(--fg-2)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', lineHeight: 1.75 }}>
              {t('bio')}
            </p>
            <p style={{ margin: 0, maxWidth: '520px', color: 'var(--fg-2)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', lineHeight: 1.75 }}>
              {t('bio2')}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 'var(--space-7)', alignItems: 'center', flexWrap: 'wrap', paddingTop: '4px' }}>
              <Link
                href="/projects"
                onClick={() => trackEvent({ screen: 'about', action: 'button-clicked', reference: 'Abriu projetos' })}
                className="btn btn-primary"
              >
                {t('cta.projects')}
              </Link>
              <a
                href={t('cta.cv_href')}
                download
                onClick={() => trackEvent({ screen: 'about', action: 'button-clicked', reference: 'Baixou o CV' })}
                className="btn btn-ghost"
              >
                {t('cta.cv')}
              </a>
            </div>
          </div>

          {/* Right column — art + badges */}
          <div className="about-hero-art">
            <div style={{ width: '100%', maxWidth: '340px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <AboutArt />
            </div>

            {/* Status / social badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-s)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px' }}>
                <span aria-hidden="true" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
                <span style={{ fontSize: 'var(--text-eyebrow)', color: 'var(--fg-2)', fontFamily: 'var(--font-sans)' }}>{t('status')}</span>
              </div>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Gabi (abre em nova aba)"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-s)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', textDecoration: 'none' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0 }}>
                  <path d="M19 3A2 2 0 0121 5V19A2 2 0 0119 21H5A2 2 0 013 19V5A2 2 0 015 3H19M18.5 18.5V13.2A3.26 3.26 0 0015.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0115.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 008.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 005.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/>
                </svg>
                <span style={{ fontSize: 'var(--text-eyebrow)', color: 'var(--fg-2)', fontFamily: 'var(--font-sans)' }}>linkedin.com/in/gabriela-msl</span>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Gabi (abre em nova aba)"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-s)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', textDecoration: 'none' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0 }}>
                  <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
                <span style={{ fontSize: 'var(--text-eyebrow)', color: 'var(--fg-2)', fontFamily: 'var(--font-sans)' }}>github.com/gabriela-miranda-leite</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
