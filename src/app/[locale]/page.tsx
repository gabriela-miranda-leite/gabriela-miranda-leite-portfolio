import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home.hero' });
  return (
    <main id="main-content" style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)' }}>
        {t('greeting')} {t('name')}
      </h1>
      <p style={{ color: 'var(--color-fg-2)' }}>{t('bio')}</p>
    </main>
  );
}
