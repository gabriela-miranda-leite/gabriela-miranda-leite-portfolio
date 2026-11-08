import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useLocale: () => 'pt',
  useTranslations: () => ({
    rich: (_key: string, values: { link: (c: string) => React.ReactNode }) => (
      <>Gostou? {values.link('Assine o RSS')} para não perder os próximos.</>
    ),
  }),
}));
jest.mock('@/lib/analytics', () => ({ trackEvent: jest.fn() }));

import { RssCta } from './RssCta';

expect.extend(toHaveNoViolations);

describe('RssCta', () => {
  it('links to the PT feed', () => {
    render(<RssCta />);
    expect(screen.getByRole('link', { name: 'Assine o RSS' })).toHaveAttribute('href', '/feed.xml');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<RssCta />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
