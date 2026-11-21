import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FreshBadge } from './FreshBadge';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

expect.extend(toHaveNoViolations);

describe('FreshBadge', () => {
  it.each(['new', 'updated'] as const)('shows the translated "%s" label', (kind) => {
    render(<FreshBadge kind={kind} />);
    expect(screen.getByText(kind)).toBeInTheDocument();
  });

  it('forwards the id so a card can describe itself with it', () => {
    render(<FreshBadge kind="new" id="badge-1" />);
    expect(screen.getByText('new')).toHaveAttribute('id', 'badge-1');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<FreshBadge kind="updated" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
