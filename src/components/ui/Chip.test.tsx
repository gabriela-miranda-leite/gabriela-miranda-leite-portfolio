import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Chip } from './Chip';

expect.extend(toHaveNoViolations);

describe('Chip', () => {
  it('renders as span when no onClick', () => {
    render(<Chip label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as button with aria-pressed when interactive', () => {
    render(<Chip label="React" onClick={() => {}} />);
    const btn = screen.getByRole('button', { name: 'React' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('reflects selected state via aria-pressed', () => {
    render(<Chip label="React" selected onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onClick when clicked', async () => {
    const handler = jest.fn();
    render(<Chip label="React" onClick={handler} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('static: has no accessibility violations', async () => {
    const { container } = render(<Chip label="TypeScript" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('interactive: has no accessibility violations', async () => {
    const { container } = render(<Chip label="TypeScript" onClick={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
