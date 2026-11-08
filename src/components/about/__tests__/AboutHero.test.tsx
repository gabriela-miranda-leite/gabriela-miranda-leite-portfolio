import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = () => [];
    return t;
  },
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/about/AboutArt', () => ({
  AboutArt: () => <svg aria-hidden="true" role="presentation" />,
}));

import { AboutHero } from '../AboutHero';

expect.extend(toHaveNoViolations);

describe('AboutHero', () => {
  it('renders h1 with id="about-heading"', () => {
    const { getByRole } = render(<AboutHero />);
    expect(getByRole('heading', { level: 1 })).toHaveAttribute('id', 'about-heading');
  });

  it('renders link to /projects', () => {
    const { getAllByRole } = render(<AboutHero />);
    const links = getAllByRole('link');
    expect(links.some((l) => l.getAttribute('href') === '/projects')).toBe(true);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AboutHero />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
