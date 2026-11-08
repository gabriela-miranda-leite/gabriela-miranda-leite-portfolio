import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = (key: string) => {
      if (key === 'items') {
        return [
          { year: '2023–now', role: 'Frontend Engineer', company: 'Acme Corp', description: 'Built things.' },
        ];
      }
      return [];
    };
    return t;
  },
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { ExperienceSection } from '../ExperienceSection';

expect.extend(toHaveNoViolations);

describe('ExperienceSection', () => {
  it('renders h2 with id="experience-heading"', () => {
    const { getByRole } = render(<ExperienceSection />);
    expect(getByRole('heading', { level: 2 })).toHaveAttribute('id', 'experience-heading');
  });

  it('renders experience entry', () => {
    const { getByText } = render(<ExperienceSection />);
    expect(getByText('Frontend Engineer')).toBeInTheDocument();
    expect(getByText('Acme Corp')).toBeInTheDocument();
    expect(getByText('Built things.')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ExperienceSection />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
