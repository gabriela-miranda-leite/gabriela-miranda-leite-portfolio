import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = (key: string) => {
      if (key === 'frontend.items') return ['React', 'Next.js'];
      if (key === 'mobile.items') return ['React Native'];
      if (key === 'tools.items') return ['Figma'];
      return [];
    };
    return t;
  },
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { StackSection } from '../StackSection';

expect.extend(toHaveNoViolations);

describe('StackSection', () => {
  it('renders h2 with id="stack-heading"', () => {
    const { getByRole } = render(<StackSection />);
    expect(getByRole('heading', { level: 2 })).toHaveAttribute('id', 'stack-heading');
  });

  it('renders skill items', () => {
    const { getByText } = render(<StackSection />);
    expect(getByText('React')).toBeInTheDocument();
    expect(getByText('React Native')).toBeInTheDocument();
    expect(getByText('Figma')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<StackSection />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
