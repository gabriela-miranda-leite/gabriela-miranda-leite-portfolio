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

import { SpotifyEmbed } from '../SpotifyEmbed';

expect.extend(toHaveNoViolations);

describe('SpotifyEmbed', () => {
  it('renders an iframe with an accessible title', () => {
    const { getByTitle } = render(<SpotifyEmbed />);
    expect(getByTitle('iframeTitle')).toBeInTheDocument();
  });

  it('renders the label and hint text', () => {
    const { getByText } = render(<SpotifyEmbed />);
    expect(getByText('label')).toBeInTheDocument();
    expect(getByText('hint')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SpotifyEmbed />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
