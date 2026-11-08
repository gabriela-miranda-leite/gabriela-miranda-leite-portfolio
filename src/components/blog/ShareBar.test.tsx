import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('@/i18n/navigation', () => ({
  usePathname: () => '/blog/test-post',
}));

import { ShareBar } from './ShareBar';

expect.extend(toHaveNoViolations);

const mockWriteText = jest.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: mockWriteText },
  configurable: true,
});

beforeEach(() => {
  mockWriteText.mockClear();
});

describe('ShareBar', () => {
  it('renders share links for LinkedIn, WhatsApp, X', () => {
    render(<ShareBar title="Meu Post" />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^compartilhar no x/i })).toBeInTheDocument();
  });

  it('renders copy button with initial label', () => {
    render(<ShareBar title="Meu Post" />);
    expect(screen.getByRole('button', { name: /copiar link do post/i })).toBeInTheDocument();
    expect(screen.getByText('Copiar link')).toBeInTheDocument();
  });

  it('calls clipboard.writeText with the full URL on copy click', async () => {
    render(<ShareBar title="Meu Post" />);
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    expect(mockWriteText).toHaveBeenCalledWith(
      expect.stringContaining('/blog/test-post')
    );
  });

  it('shows "Copiado!" after clicking copy', async () => {
    render(<ShareBar title="Meu Post" />);
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    expect(screen.getByText('Copiado!')).toBeInTheDocument();
  });

  it('reverts to "Copiar link" after 2s', async () => {
    jest.useFakeTimers();
    render(<ShareBar title="Meu Post" />);
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    expect(screen.getByText('Copiado!')).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(2000); });
    await waitFor(() => expect(screen.getByText('Copiar link')).toBeInTheDocument());
    jest.useRealTimers();
  });

  it('LinkedIn href contains encoded URL', () => {
    render(<ShareBar title="Meu Post" />);
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link.getAttribute('href')).toContain('linkedin.com');
    expect(link.getAttribute('href')).toContain('blog%2Ftest-post');
  });

  it('opens share links in new tab', () => {
    render(<ShareBar title="Meu Post" />);
    const links = [
      screen.getByRole('link', { name: /linkedin/i }),
      screen.getByRole('link', { name: /whatsapp/i }),
      screen.getByRole('link', { name: /^compartilhar no x/i }),
    ];
    links.forEach((link) => expect(link).toHaveAttribute('target', '_blank'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ShareBar title="Meu Post" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);

  it('has no accessibility violations in copied state', async () => {
    const { container } = render(<ShareBar title="Meu Post" />);
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);
});
