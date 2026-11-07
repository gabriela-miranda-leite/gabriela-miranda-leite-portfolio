export function websiteJsonLd(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gabrielaleite.dev';
  const url = locale === 'pt' ? baseUrl : `${baseUrl}/en`;

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
