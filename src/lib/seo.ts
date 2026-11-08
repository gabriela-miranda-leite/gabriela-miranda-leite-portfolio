import { SITE_URL, CONTACT_EMAIL, SOCIAL_LINKS } from './constants';

export function blogPostingJsonLd({
  title,
  description,
  date,
  slug,
  locale,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  locale: string;
}) {
  const url =
    locale === 'pt' ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/en/blog/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    url,
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
    author: {
      '@type': 'Person',
      name: 'Gabriela Miranda Leite',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Gabriela Miranda Leite',
      url: SITE_URL,
    },
  };
}

export function profilePageJsonLd({ locale, url }: { locale: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    name: locale === 'pt' ? 'Sobre — Gabi Miranda' : 'About — Gabi Miranda',
    mainEntity: {
      '@type': 'Person',
      name: 'Gabriela Miranda Leite',
      jobTitle: 'Frontend & Mobile Developer',
      email: CONTACT_EMAIL,
      url: SITE_URL,
      sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    },
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
  };
}

export function websiteJsonLd(locale: string) {
  const url = locale === 'pt' ? SITE_URL : `${SITE_URL}/en`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name: 'Gabi Miranda — Portfolio',
    description:
      locale === 'pt'
        ? 'Design systems, acessibilidade e UX. Pagamentos e mobile no setor fintech.'
        : 'Design systems, accessibility and UX. Payments and mobile in fintech.',
    author: {
      '@type': 'Person',
      name: 'Gabriela Miranda Leite',
      email: 'gabrielamiranda11.10@gmail.com',
    },
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
  };
}
