import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders primary variant', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button', { name: 'Ghost' })).toBeInTheDocument();
  });

  it('renders pill variant', () => {
    render(<Button variant="pill">◐ tema</Button>);
    expect(screen.getByRole('button', { name: '◐ tema' })).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('primary: has no accessibility violations', async () => {
    const { container } = render(<Button>Primary</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('ghost: has no accessibility violations', async () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('pill: has no accessibility violations', async () => {
    const { container } = render(<Button variant="pill">◐ tema</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
