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
  SOCIAL_LINKS: {
    linkedin: 'https://www.linkedin.com/in/test/',
    github: 'https://github.com/test',
  },
}));

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

import { ContactCTA } from '../ContactCTA';

expect.extend(toHaveNoViolations);

describe('ContactCTA', () => {
  it('renders h2 with id="contact-heading"', () => {
    const { getByRole } = render(<ContactCTA />);
    expect(getByRole('heading', { level: 2 })).toHaveAttribute('id', 'contact-heading');
  });

  it('renders mailto, LinkedIn and GitHub links without a CTA button', () => {
    const { getByRole, container } = render(<ContactCTA />);
    const mailLink = getByRole('link', { name: 'test@example.com' });
    expect(mailLink.getAttribute('href')).toBe('mailto:test@example.com');

    const linkedinLink = getByRole('link', { name: 'linkedinLabel' });
    expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/test/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');

    const githubLink = getByRole('link', { name: 'githubLabel' });
    expect(githubLink.getAttribute('href')).toBe('https://github.com/test');
    expect(githubLink).toHaveAttribute('target', '_blank');

    expect(container.querySelector('.btn-primary')).toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ContactCTA />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
