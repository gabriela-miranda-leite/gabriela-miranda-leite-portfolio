import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

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

import { Hero } from '../Hero';

expect.extend(toHaveNoViolations);

describe('Hero', () => {
  it('renderiza heading com id="hero-heading"', () => {
    const { getByRole } = render(<Hero />);
    expect(getByRole('heading', { level: 1 })).toHaveAttribute('id', 'hero-heading');
  });

  it('renderiza links CTA para /projects e /blog', () => {
    const { getAllByRole } = render(<Hero />);
    const links = getAllByRole('link');
    expect(links.some((l) => l.getAttribute('href') === '/projects')).toBe(true);
    expect(links.some((l) => l.getAttribute('href') === '/blog')).toBe(true);
  });

  it('sem violações de acessibilidade', async () => {
    const { container } = render(<Hero />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
