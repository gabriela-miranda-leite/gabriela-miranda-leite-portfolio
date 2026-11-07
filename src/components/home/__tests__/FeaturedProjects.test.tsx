import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { GithubRepo } from '@/types/project';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { FeaturedProjects } from '../FeaturedProjects';

expect.extend(toHaveNoViolations);

const REPOS: GithubRepo[] = [
  { id: 1, name: 'gymflow', full_name: 'gabi/gymflow', description: 'App de treinos', html_url: 'https://github.com/gabi/gymflow', language: 'TypeScript', stargazers_count: 10, pushed_at: '2026-10-01', topics: ['react-native', 'expo'] },
  { id: 2, name: 'ds-fintech', full_name: 'gabi/ds-fintech', description: 'Design system', html_url: 'https://github.com/gabi/ds-fintech', language: 'React', stargazers_count: 5, pushed_at: '2026-09-01', topics: [] },
];

describe('FeaturedProjects', () => {
  it('renders one external link per repo', () => {
    const { getAllByRole } = render(<FeaturedProjects repos={REPOS} />);
    const links = getAllByRole('link').filter((l) =>
      l.getAttribute('href')?.startsWith('https://github.com')
    );
    expect(links).toHaveLength(2);
  });

  it('shows repo name', () => {
    const { getByText } = render(<FeaturedProjects repos={REPOS} />);
    expect(getByText('gymflow')).toBeInTheDocument();
  });

  it('renders nothing when repos list is empty', () => {
    const { container } = render(<FeaturedProjects repos={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<FeaturedProjects repos={REPOS} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
