'use client';

import { useLocale, useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

export function RssCta() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const href = locale === 'pt' ? '/feed.xml' : '/en/feed.xml';

  return (
    <p
      style={{
        marginTop: 'var(--space-10)',
        fontSize: 'var(--text-meta)',
        color: 'var(--fg-2)',
        maxWidth: '100%',
      }}
    >
      {t.rich('rss_cta', {
        link: (chunks) => (
          <a
            href={href}
            onClick={() =>
              trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Abriu o RSS (fim do post)' })
            }
            style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            {chunks}
          </a>
        ),
      })}
    </p>
  );
}
