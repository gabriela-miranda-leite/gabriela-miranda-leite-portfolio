import { getLocale, getTranslations } from 'next-intl/server';
import { getGithubUsername, getRepo } from '@/lib/github';
import { RepoCard } from '@/components/ui/RepoCard';

interface RepoEmbedProps {
  repo: string;
}

const GITHUB_URL_PREFIX = 'https://github.com/';

export async function RepoEmbed({ repo: name }: RepoEmbedProps) {
  const [data, t, locale] = await Promise.all([getRepo(name), getTranslations('repo_card'), getLocale()]);
  const fallbackHref = `${GITHUB_URL_PREFIX}${getGithubUsername()}/${encodeURIComponent(name)}`;

  if (!data) {
    return (
      <p>
        <a href={fallbackHref} target="_blank" rel="noopener noreferrer" aria-label={t('aria', { name })}>
          {`${getGithubUsername()}/${name}`}
        </a>
      </p>
    );
  }

  const href = data.html_url.startsWith(GITHUB_URL_PREFIX) ? data.html_url : fallbackHref;
  const date = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(
    new Date(data.pushed_at)
  );

  return (
    <RepoCard
      repo={{ ...data, topics: data.topics ?? [] }}
      href={href}
      labels={{
        cta: t('cta'),
        aria: t('aria', { name: data.name }),
        stars: t('stars', { count: data.stargazers_count }),
        forks: t('forks', { count: data.forks_count ?? 0 }),
        updated: t('updated', { date }),
      }}
    />
  );
}
