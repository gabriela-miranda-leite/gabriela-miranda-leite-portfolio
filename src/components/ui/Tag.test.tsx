import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tag } from './Tag';

expect.extend(toHaveNoViolations);

describe('Tag', () => {
  it('renders as span when no onClick', () => {
    render(<Tag label="design" />);
    expect(screen.getByText('design')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as button with aria-pressed when interactive', () => {
    render(<Tag label="design" onClick={() => {}} />);
    const btn = screen.getByRole('button', { name: 'design' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('reflects selected state via aria-pressed', () => {
    render(<Tag label="design" selected onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onClick when clicked', async () => {
    const handler = jest.fn();
    render(<Tag label="design" onClick={handler} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('static: has no accessibility violations', async () => {
    const { container } = render(<Tag label="nextjs" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('interactive: has no accessibility violations', async () => {
    const { container } = render(<Tag label="nextjs" onClick={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
