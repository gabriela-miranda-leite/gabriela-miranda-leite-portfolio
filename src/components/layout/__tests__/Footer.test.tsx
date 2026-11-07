import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { Footer } from '../Footer';

expect.extend(toHaveNoViolations);

describe('Footer', () => {
  it('renders a footer landmark', () => {
    const { getByRole } = render(<Footer />);
    expect(getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has aria-label on all social icon links', () => {
    const { getAllByRole } = render(<Footer />);
    const links = getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
