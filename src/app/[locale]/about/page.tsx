import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/AboutHero';
import { StackSection } from '@/components/about/StackSection';
import { ExperienceSection } from '@/components/about/ExperienceSection';
import { ContactCTA } from '@/components/about/ContactCTA';
import { profilePageJsonLd } from '@/lib/seo';
import { SITE_URL as baseUrl } from '@/lib/constants';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const url = locale === 'pt' ? `${baseUrl}/about` : `${baseUrl}/en/about`;
  const ogUrl = `${baseUrl}/og?title=${encodeURIComponent(t('meta_title'))}&subtitle=${encodeURIComponent(t('meta_description'))}`;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    openGraph: {
      type: 'profile',
      title: t('meta_title'),
      description: t('meta_description'),
      url,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
      images: [ogUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/about`,
        en: `${baseUrl}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const url = locale === 'pt' ? `${baseUrl}/about` : `${baseUrl}/en/about`;
  const jsonLd = profilePageJsonLd({ locale, url });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHero />
      <StackSection />
      <ExperienceSection />
      <ContactCTA />
    </>
  );
}
