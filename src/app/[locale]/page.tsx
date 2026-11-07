import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  return (
    <main id="main-content" style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)' }}>
        {t('home.hero.greeting')} {t('home.hero.name')}
      </h1>
      <p style={{ color: 'var(--color-fg-2)' }}>{t('home.hero.bio')}</p>
    </main>
  );
}
