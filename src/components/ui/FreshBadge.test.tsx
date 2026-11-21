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

  it.each([
    ['new', 'var(--new)', 'var(--new-a)'],
    ['updated', 'var(--updated)', 'var(--updated-a)'],
  ] as const)('colors the "%s" label with its own tokens, not the brand accent', (kind, color, background) => {
    render(<FreshBadge kind={kind} />);
    const style = screen.getByText(kind).getAttribute('style') ?? '';

    expect(style).toContain(`color: ${color}`);
    expect(style).toContain(`background: ${background}`);
    expect(style).not.toContain('var(--accent)');
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
