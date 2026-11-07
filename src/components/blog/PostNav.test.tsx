import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
}));

jest.mock('@phosphor-icons/react/dist/ssr', () => ({
  ArrowLeft: () => <svg aria-hidden="true" />,
  ArrowRight: () => <svg aria-hidden="true" />,
}));

import { PostNav } from './PostNav';

expect.extend(toHaveNoViolations);

const prev = { slug: 'older-post', title: 'Older Post' };
const next = { slug: 'newer-post', title: 'Newer Post' };

describe('PostNav', () => {
  it('renders nothing when both prev and next are null', () => {
    const { container } = render(<PostNav prev={null} next={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders prev link when prev is provided', () => {
    render(<PostNav prev={prev} next={null} />);
    expect(screen.getByRole('link', { name: /older post/i })).toHaveAttribute(
      'href',
      '/blog/older-post'
    );
  });

  it('renders next link when next is provided', () => {
    render(<PostNav prev={null} next={next} />);
    expect(screen.getByRole('link', { name: /newer post/i })).toHaveAttribute(
      'href',
      '/blog/newer-post'
    );
  });

  it('renders both links when both are provided', () => {
    render(<PostNav prev={prev} next={next} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('has no accessibility violations with both links', async () => {
    const { container } = render(<PostNav prev={prev} next={next} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with only prev', async () => {
    const { container } = render(<PostNav prev={prev} next={null} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
