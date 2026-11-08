'use client';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';

export function LangSwitch() {
  const locale = useLocale();
  const t = useTranslations('lang');
  const pathname = usePathname();
  const router = useRouter();
  const [announcement, setAnnouncement] = useState('');

  const next = locale === 'pt' ? 'en' : 'pt';

  const toggle = () => {
    setAnnouncement(t('announce'));
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {announcement}
      </span>

      <button
        onClick={toggle}
        aria-label={t('ariaLabel')}
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
        <span
          style={{
            color: locale === 'pt' ? 'var(--accent)' : 'var(--fg-2)',
            fontWeight: locale === 'pt' ? 600 : 400,
            textDecoration: locale === 'pt' ? 'underline' : 'none',
            textUnderlineOffset: '3px',
          }}
        >
          PT
        </span>
        <span aria-hidden="true" style={{ color: 'var(--fg-3)' }}>|</span>
        <span
          style={{
            color: locale === 'en' ? 'var(--accent)' : 'var(--fg-2)',
            fontWeight: locale === 'en' ? 600 : 400,
            textDecoration: locale === 'en' ? 'underline' : 'none',
            textUnderlineOffset: '3px',
          }}
        >
          EN
        </span>
      </button>
    </>
  );
}
