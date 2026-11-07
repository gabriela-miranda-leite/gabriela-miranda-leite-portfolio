import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { TagFilter } from './TagFilter';

expect.extend(toHaveNoViolations);

const tags = ['design-systems', 'accessibility', 'react'];

describe('TagFilter', () => {
  it('renders "all" chip and all tags', () => {
    render(<TagFilter tags={tags} selected={null} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument();
    tags.forEach((tag) => {
      expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
    });
  });

  it('"all" chip is selected when selected is null', () => {
    render(<TagFilter tags={tags} selected={null} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'all' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with tag when a tag chip is clicked', () => {
    const onChange = jest.fn();
    render(<TagFilter tags={tags} selected={null} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'design-systems' }));
    expect(onChange).toHaveBeenCalledWith('design-systems');
  });

  it('calls onChange with null when "all" is clicked', () => {
    const onChange = jest.fn();
    render(<TagFilter tags={tags} selected="design-systems" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'all' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('marks the selected tag chip as pressed', () => {
    render(<TagFilter tags={tags} selected="accessibility" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'accessibility' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'design-systems' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TagFilter tags={tags} selected={null} onChange={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
