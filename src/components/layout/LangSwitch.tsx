'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () =>
    router.replace(pathname, { locale: locale === 'pt' ? 'en' : 'pt' });

  return (
    <button
      onClick={toggle}
      aria-label={`Mudar para ${locale === 'pt' ? 'English' : 'Português'}`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--color-fg-2)',
        background: 'none',
        border: '1px solid var(--color-border)',
        padding: '4px 10px',
        borderRadius: '100px',
        cursor: 'pointer',
        letterSpacing: '0.05em',
      }}
    >
      {locale === 'pt' ? 'EN' : 'PT'}
    </button>
  );
}
