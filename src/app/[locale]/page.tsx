import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home.hero' });
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)' }}>
        {t('greeting')} {t('name')}
      </h1>
      <p style={{ color: 'var(--fg-2)' }}>{t('bio')}</p>
    </div>
  );
}
