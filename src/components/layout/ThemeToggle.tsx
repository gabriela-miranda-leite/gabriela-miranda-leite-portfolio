'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CircleHalf } from '@phosphor-icons/react';

type Theme = 'dark' | 'light';

export function ThemeToggle() {
  const t = useTranslations('nav');
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
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={`${t('theme')}: mudar para ${theme === 'dark' ? 'claro' : 'escuro'}`}
      style={{
        background: 'var(--bg-s)',
        border: '1px solid var(--border)',
        color: 'var(--fg-2)',
        padding: '7px 15px',
        borderRadius: '100px',
        fontSize: '12px',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <CircleHalf size={13} aria-hidden="true" focusable="false" />
      {t('theme')}
    </button>
  );
}
