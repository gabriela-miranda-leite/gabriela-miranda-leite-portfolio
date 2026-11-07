'use client';
import { useTranslations } from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('nav');

  return (
    <a
      href="#main-content"
      className="skip-to-content"
      onFocus={(e) => ((e.target as HTMLElement).style.top = '0')}
      onBlur={(e) => ((e.target as HTMLElement).style.top = '-100%')}
      style={{
        position: 'fixed',
        top: '-100%',
        left: '1rem',
        zIndex: 9999,
        background: 'var(--accent)',
        color: 'var(--bg)',
        padding: 'var(--space-5) var(--space-10)',
        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
        fontWeight: 600,
        fontSize: 'var(--text-sm)',
        fontFamily: 'var(--font-sans)',
        textDecoration: 'none',
      }}
    >
      {t('skipToContent')}
    </a>
  );
}
