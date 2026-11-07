'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: 'pt' | 'en') => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <div
      role="group"
      aria-label="Idioma"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-meta)',
        letterSpacing: '0.05em',
      }}
    >
      <button
        onClick={() => switchTo('pt')}
        aria-pressed={locale === 'pt'}
        aria-label="Português"
        style={{
          background: 'none',
          border: 'none',
          cursor: locale === 'pt' ? 'default' : 'pointer',
          padding: 0,
          color: locale === 'pt' ? 'var(--accent)' : 'var(--fg-2)',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          fontWeight: locale === 'pt' ? 600 : 400,
        }}
      >
        PT
      </button>
      <span aria-hidden="true" style={{ color: 'var(--fg-3)' }}>|</span>
      <button
        onClick={() => switchTo('en')}
        aria-pressed={locale === 'en'}
        aria-label="English"
        style={{
          background: 'none',
          border: 'none',
          cursor: locale === 'en' ? 'default' : 'pointer',
          padding: 0,
          color: locale === 'en' ? 'var(--accent)' : 'var(--fg-2)',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          fontWeight: locale === 'en' ? 600 : 400,
        }}
      >
        EN
      </button>
    </div>
  );
}
