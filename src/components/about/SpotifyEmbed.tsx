'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { SPOTIFY_PLAYLIST_ID } from '@/lib/constants';

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setIsDark(root.getAttribute('data-theme') !== 'light');

    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function SpotifyEmbed() {
  const t = useTranslations('about.spotify');
  const [hasError, setHasError] = useState(false);
  const isDark = useIsDarkTheme();

  return (
    <section
      className="section-enter"
      aria-labelledby="spotify-heading"
      style={{
        paddingTop: 'clamp(2rem, 5vw, var(--space-18))',
        paddingBottom: 'clamp(2rem, 5vw, var(--space-18))',
        borderTop: '1px solid var(--border)',
        '--enter-delay': '0.3s',
      } as React.CSSProperties}
    >
      <Container>
        <p
          id="spotify-heading"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-eyebrow)',
            color: 'var(--fg-2)',
            letterSpacing: '0.04em',
            margin: '0 0 var(--space-6)',
          }}
        >
          {t('label')}
        </p>

        {hasError ? (
          <p style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)' }}>
            {t('unavailable')}
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
            title={t('iframeTitle')}
            onError={() => setHasError(true)}
            style={{ borderRadius: 'var(--radius)', maxWidth: '100%', display: 'block' }}
          />
        )}

        <p
          style={{
            margin: 'var(--space-6) 0 0',
            color: 'var(--fg-2)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body)',
          }}
        >
          {t('hint')}
        </p>
      </Container>
    </section>
  );
}
