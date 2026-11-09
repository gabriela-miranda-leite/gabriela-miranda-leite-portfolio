import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gabi Miranda',
  description: 'Frontend & Mobile Developer — Design systems, acessibilidade e UX.',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'Gabi Miranda — Blog (PT)' },
        { url: '/en/feed.xml', title: 'Gabi Miranda — Blog (EN)' },
      ],
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale === 'pt' ? 'pt-BR' : 'en'} suppressHydrationWarning style={{ background: '#0C0C0A' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400..800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
      {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
