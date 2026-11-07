import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/navigation';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as 'pt' | 'en')) notFound();

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <SkipToContent />
      <Nav />
      <main id="main-content" style={{ minHeight: '60vh' }}>
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
