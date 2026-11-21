'use client';

import { useLocale, useTranslations } from 'next-intl';
import { RepoCard } from '@/components/ui/RepoCard';
import type { GithubRepo } from '@/types/project';

interface ProjectCardProps {
  repo: GithubRepo;
  screen?: 'projects' | 'home';
}

export function ProjectCard({ repo, screen = 'projects' }: ProjectCardProps) {
  const t = useTranslations('repo_card');
  const locale = useLocale();
  const date = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(
    new Date(repo.pushed_at)
  );

  return (
    <RepoCard
      repo={repo}
      href={repo.html_url}
      screen={screen}
      fill
      labels={{
        cta: t('cta'),
        aria: t('aria', { name: repo.name }),
        stars: t('stars', { count: repo.stargazers_count }),
        forks: t('forks', { count: repo.forks_count ?? 0 }),
        updated: t('updated', { date }),
      }}
    />
  );
}
