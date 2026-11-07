import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { SkipToContent } from '../SkipToContent';

expect.extend(toHaveNoViolations);

describe('SkipToContent', () => {
  it('renders a link pointing to #main-content', () => {
    const { getByRole } = render(<SkipToContent />);
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SkipToContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
