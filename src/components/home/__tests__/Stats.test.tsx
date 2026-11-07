import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { Stats } from '../Stats';

expect.extend(toHaveNoViolations);

describe('Stats', () => {
  it('renderiza três estatísticas', () => {
    const { getAllByRole } = render(<Stats />);
    expect(getAllByRole('term')).toHaveLength(3);
    expect(getAllByRole('definition')).toHaveLength(3);
  });

  it('sem violações de acessibilidade', async () => {
    const { container } = render(<Stats />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
