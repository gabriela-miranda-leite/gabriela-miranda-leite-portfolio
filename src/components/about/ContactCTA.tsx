'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/layout/Container';
import { CONTACT_EMAIL, SOCIAL_LINKS, SPOTIFY_PLAYLIST_ID } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useIsDarkTheme } from '@/lib/useIsDarkTheme';

export function ContactCTA() {
  const t = useTranslations('about.contact');
  const ts = useTranslations('about.spotify');
  const [spotifyHasError, setSpotifyHasError] = useState(false);
  const isDark = useIsDarkTheme();

  const spotifyMetaStyle: React.CSSProperties = {
    margin: 0,
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-eyebrow)',
    color: 'var(--fg-2)',
    letterSpacing: '0.04em',
  };

  return (
    <section
      className="section-enter"
      aria-labelledby="contact-heading"
      style={{
        paddingTop: 'clamp(2rem, 5vw, var(--space-18))',
        paddingBottom: 'clamp(2rem, 5vw, var(--space-18))',
        borderTop: '1px solid var(--border)',
        '--enter-delay': '0.35s',
      } as React.CSSProperties}
    >
      <Container>
        <div className="about-contact-grid">
          {/* Left — contact signature */}
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
                maxWidth: '420px',
                color: 'var(--fg-2)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body)',
                lineHeight: 1.7,
              }}
            >
              {t('body')}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-7)', marginTop: '4px' }}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => trackEvent({ screen: 'about', action: 'button_clicked', reference: 'Abriu o e-mail de contato' })}
                className="share-pill"
              >
                <EnvelopeSimple size={14} aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="share-pill"
              >
                <LinkedinLogo size={14} weight="fill" aria-hidden="true" />
                {t('linkedinLabel')}
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="share-pill"
              >
                <GithubLogo size={14} weight="fill" aria-hidden="true" />
                {t('githubLabel')}
              </a>
            </div>
          </div>

          {/* Right — what I'm listening to */}
          <div aria-labelledby="spotify-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <p id="spotify-heading" style={spotifyMetaStyle}>
              {ts('label')}
            </p>

            {spotifyHasError ? (
              <p style={spotifyMetaStyle}>
                {ts('unavailable')}
              </p>
            ) : (
              <iframe
                key={isDark ? 'dark' : 'light'}
                src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator${isDark ? '&theme=0' : ''}`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={ts('iframeTitle')}
                onError={() => setSpotifyHasError(true)}
                style={{ borderRadius: 'var(--radius)', maxWidth: '100%', display: 'block' }}
              />
            )}

            <p style={spotifyMetaStyle}>
              {ts('hint')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
