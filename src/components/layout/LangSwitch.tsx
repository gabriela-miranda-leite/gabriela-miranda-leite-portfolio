'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const next = locale === 'pt' ? 'en' : 'pt';
  const toggle = () => router.replace(pathname, { locale: next });

  return (
    <button
      onClick={toggle}
      aria-label={`Mudar idioma para ${next === 'en' ? 'inglês' : 'português'}`}
      aria-live="polite"
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
      <span style={{ color: locale === 'pt' ? 'var(--accent)' : 'var(--fg-2)', fontWeight: locale === 'pt' ? 600 : 400 }}>PT</span>
      <span aria-hidden="true" style={{ color: 'var(--fg-3)' }}>|</span>
      <span style={{ color: locale === 'en' ? 'var(--accent)' : 'var(--fg-2)', fontWeight: locale === 'en' ? 600 : 400 }}>EN</span>
    </button>
  );
}
