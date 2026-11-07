import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'ariaLabel' ? 'principal' : key,
  useLocale: () => 'pt',
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
  usePathname: () => '/',
  useRouter: () => ({ replace: jest.fn() }),
}));

// LangSwitch also uses next-intl and @/i18n/navigation — both mocked above
import { Nav } from '../Nav';

expect.extend(toHaveNoViolations);

describe('Nav', () => {
  it('renders a nav with aria-label="principal"', () => {
    const { getAllByRole } = render(<Nav />);
    const navs = getAllByRole('navigation');
    expect(navs.some((n) => n.getAttribute('aria-label') === 'principal')).toBe(true);
  });

  it('renders logo link pointing to /', () => {
    const { getByRole } = render(<Nav />);
    const logo = getByRole('link', { name: /gabi miranda/i });
    expect(logo).toHaveAttribute('href', '/');
  });

  it('no link has aria-current="page" on the home route', () => {
    // usePathname returns '/' — none of /blog, /projects, /about match
    const { getAllByRole } = render(<Nav />);
    const links = getAllByRole('link');
    links.forEach((l) => {
      expect(l).not.toHaveAttribute('aria-current', 'page');
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Nav />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
