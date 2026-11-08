'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CircleHalf } from '@phosphor-icons/react';
import { usePathname } from '@/i18n/navigation';
import { screenFromPathname, trackEvent } from '@/lib/analytics';

type Theme = 'dark' | 'light';

export function ThemeToggle() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      const initial: Theme =
        stored ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    } catch {}
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    trackEvent({ screen: screenFromPathname(pathname), action: 'button-clicked', reference: `Trocou o tema para ${next}` });
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={`${t('theme')}: mudar para ${theme === 'dark' ? 'claro' : 'escuro'}`}
      className="nav-pill-btn"
      style={{
        background: 'var(--bg-s)',
        border: '1px solid var(--border)',
        color: 'var(--fg-2)',
        padding: 'var(--space-4) var(--space-9)',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-eyebrow)',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}
    >
      <CircleHalf size={13} aria-hidden="true" focusable="false" />
      {t('theme')}
    </button>
  );
}
