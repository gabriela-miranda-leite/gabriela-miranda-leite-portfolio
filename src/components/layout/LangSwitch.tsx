'use client';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { screenFromPathname, trackEvent } from '@/lib/analytics';

const LANGUAGES = [
  { locale: 'pt', label: 'PT', htmlLang: 'pt-BR', nameKey: 'namePt', announceKey: 'announcePt' },
  { locale: 'en', label: 'EN', htmlLang: 'en', nameKey: 'nameEn', announceKey: 'announceEn' },
] as const;

export function LangSwitch() {
  const locale = useLocale();
  const t = useTranslations('lang');
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState('');

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

      <div
        role="group"
        aria-label={t('groupLabel')}
        className="lang-switch"
        style={{
          background: 'var(--bg-s)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-pill)',
          padding: 'var(--space-2)',
          fontSize: 'var(--text-eyebrow)',
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        {LANGUAGES.map(({ locale: target, label, htmlLang, nameKey, announceKey }) => {
          const isCurrent = locale === target;
          return (
            <Link
              key={target}
              href={pathname}
              locale={target}
              lang={htmlLang}
              hrefLang={htmlLang}
              aria-label={t(nameKey)}
              aria-current={isCurrent ? 'true' : undefined}
              className="lang-switch-option"
              onClick={() => {
                if (isCurrent) return;
                trackEvent({
                  screen: screenFromPathname(pathname),
                  action: 'button_clicked',
                  reference: `Trocou o idioma para ${target}`,
                });
                setAnnouncement(t(announceKey));
              }}
              style={{
                color: isCurrent ? 'var(--accent)' : 'var(--fg-2)',
                fontWeight: isCurrent ? 600 : 400,
                textDecoration: isCurrent ? 'underline' : 'none',
                textUnderlineOffset: '3px',
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
