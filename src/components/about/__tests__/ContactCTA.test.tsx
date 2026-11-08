import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = () => [];
    return t;
  },
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/lib/constants', () => ({
  CONTACT_EMAIL: 'test@example.com',
}));

import { ContactCTA } from '../ContactCTA';

expect.extend(toHaveNoViolations);

describe('ContactCTA', () => {
  it('renders h2 with id="contact-heading"', () => {
    const { getByRole } = render(<ContactCTA />);
    expect(getByRole('heading', { level: 2 })).toHaveAttribute('id', 'contact-heading');
  });

  it('renders mailto link with the contact email', () => {
    const { getByRole } = render(<ContactCTA />);
    const link = getByRole('link');
    expect(link.getAttribute('href')).toBe('mailto:test@example.com');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ContactCTA />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
