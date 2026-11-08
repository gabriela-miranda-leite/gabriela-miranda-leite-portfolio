'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { AboutArt } from './AboutArt';

export function AboutHero() {
  const t = useTranslations('about.hero');

  return (
    <section
      aria-labelledby="about-heading"
      style={{
        paddingTop: 'clamp(2.5rem, 8vw, var(--space-18))',
        paddingBottom: 'clamp(2.5rem, 6vw, var(--space-18))',
      }}
    >
      <Container>
        <div className="about-hero-grid">
          {/* Left column */}
          <div>
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
                style={{
                  display: 'block',
                  width: '28px',
                  height: '1px',
                  background: 'var(--accent)',
                  flexShrink: 0,
                }}
              />
              {t('eyebrow')}
            </div>

            {/* Heading */}
            <h1
              id="about-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 8vw, var(--text-title))',
                letterSpacing: '-0.025em',
                lineHeight: 'var(--leading-heading)',
                fontOpticalSizing: 'auto' as React.CSSProperties['fontOpticalSizing'],
                margin: '0 0 var(--space-14)',
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
                {t('title_line1')}
              </span>
              <span
                style={{
                  display: 'block',
                  fontWeight: 800,
                  color: 'var(--fg)',
                }}
              >
                {t('title_line2')}
              </span>
            </h1>

            {/* Bio */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-lede)',
                lineHeight: 'var(--leading-lede)',
                color: 'var(--fg-2)',
                maxWidth: '480px',
                margin: '0 0 2rem',
              }}
            >
              {t('bio')}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-7)',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
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
                  outline: 'none',
                }}
              >
                {t('cta.projects')}
              </Link>
              <a
                href={t('cta.cv_href')}
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
                {t('cta.cv')}
              </a>
            </div>
          </div>

          {/* Right column — decorative art */}
          <div className="about-hero-art" aria-hidden="true">
            <AboutArt />
          </div>
        </div>
      </Container>

      <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-18);
          align-items: center;
        }
        .about-hero-art {
          display: none;
        }
        @media (min-width: 640px) {
          .about-hero-grid {
            grid-template-columns: 1fr 1fr;
          }
          .about-hero-art {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .about-hero-grid a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
