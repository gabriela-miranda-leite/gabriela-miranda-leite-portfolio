import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { Stats } from '../Stats';

expect.extend(toHaveNoViolations);

describe('Stats', () => {
  it('renders three stat values', () => {
    const { getAllByRole } = render(<Stats />);
    expect(getAllByRole('definition')).toHaveLength(3);
    expect(getAllByRole('term')).toHaveLength(3);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Stats />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
