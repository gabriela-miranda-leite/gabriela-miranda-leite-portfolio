import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import ptMessages from '@/messages/pt.json';

jest.mock('@/i18n/navigation', () => ({
  usePathname: () => '/blog/test-post',
}));

jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const scope = namespace
      .split('.')
      .reduce<unknown>((acc, part) => (acc as Record<string, unknown>)[part], ptMessages);
    return (scope as Record<string, string>)[key];
  },
}));

import { ShareBar } from './ShareBar';

expect.extend(toHaveNoViolations);

// ShareBar fetches its /og/story card on mount (to pre-build the Instagram share
// file); flushing that microtask after render keeps every test's state updates
// inside act(), even tests that never await anything else themselves.
async function renderShareBar(props: React.ComponentProps<typeof ShareBar>) {
  const result = render(<ShareBar {...props} />);
  await act(async () => {});
  return result;
}

const mockWriteText = jest.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: mockWriteText },
  configurable: true,
});

beforeEach(() => {
  mockWriteText.mockClear();
  Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
  // ShareBar always fetches its /og/story card on mount to pre-build the Instagram
  // share file; every test needs this mocked, not just the Instagram-specific ones.
  global.fetch = jest.fn().mockResolvedValue({
    blob: () => Promise.resolve(new Blob(['fake'], { type: 'image/png' })),
  }) as unknown as typeof fetch;
});

describe('ShareBar', () => {
  it('renders share links for LinkedIn, WhatsApp, X', async () => {
    await renderShareBar({ title: 'Meu Post' });
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^compartilhar no x/i })).toBeInTheDocument();
  });

  it('renders copy button with initial label', async () => {
    await renderShareBar({ title: 'Meu Post' });
    expect(screen.getByRole('button', { name: /copiar link do post/i })).toBeInTheDocument();
    expect(screen.getByText('Copiar link')).toBeInTheDocument();
  });

  it('calls clipboard.writeText with the full URL on copy click', async () => {
    await renderShareBar({ title: 'Meu Post' });
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    expect(mockWriteText).toHaveBeenCalledWith(
      expect.stringContaining('/blog/test-post')
    );
  });

  it('shows "Copiado!" after clicking copy', async () => {
    await renderShareBar({ title: 'Meu Post' });
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    expect(screen.getByText('Copiado!')).toBeInTheDocument();
  });

  it('reverts to "Copiar link" after 2s', async () => {
    jest.useFakeTimers();
    await renderShareBar({ title: 'Meu Post' });
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    expect(screen.getByText('Copiado!')).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(2000); });
    await waitFor(() => expect(screen.getByText('Copiar link')).toBeInTheDocument());
    jest.useRealTimers();
  });

  it('LinkedIn href contains encoded URL', async () => {
    await renderShareBar({ title: 'Meu Post' });
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link.getAttribute('href')).toContain('linkedin.com');
    expect(link.getAttribute('href')).toContain('blog%2Ftest-post');
  });

  describe('Instagram Stories button', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'canShare', {
        value: jest.fn().mockReturnValue(true),
        configurable: true,
      });
      Object.defineProperty(navigator, 'share', { value: jest.fn().mockResolvedValue(undefined), configurable: true });
    });

    const props = { title: 'Meu Post', description: 'Um resumo do post', image: '/posts/x/cover.jpg' };

    it('renders once the story image URL is built on mount', async () => {
      await renderShareBar(props);
      expect(screen.getByRole('button', { name: /instagram/i })).toBeInTheDocument();
    });

    it('fetches the /og/story endpoint on the current origin, not a hardcoded domain', async () => {
      await renderShareBar(props);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`${window.location.origin}/og/story?`));
    });

    it('shares the fetched story image as a file via the native share sheet', async () => {
      await renderShareBar(props);
      const btn = screen.getByRole('button', { name: /instagram/i });
      await act(async () => { fireEvent.click(btn); });
      expect(navigator.share).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Meu Post', files: expect.any(Array) })
      );
    });
  });

  it('opens share links in new tab', async () => {
    await renderShareBar({ title: 'Meu Post' });
    const links = [
      screen.getByRole('link', { name: /linkedin/i }),
      screen.getByRole('link', { name: /whatsapp/i }),
      screen.getByRole('link', { name: /^compartilhar no x/i }),
    ];
    links.forEach((link) => expect(link).toHaveAttribute('target', '_blank'));
  });

  describe('with the Web Share API available', () => {
    const mockShare = jest.fn().mockResolvedValue(undefined);

    beforeEach(() => {
      mockShare.mockClear();
      Object.defineProperty(navigator, 'share', { value: mockShare, configurable: true });
    });

    it('adds a native share button alongside LinkedIn and X, replacing WhatsApp', async () => {
      await renderShareBar({ title: 'Meu Post' });
      expect(await screen.findByRole('button', { name: /escolher um app/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^compartilhar no x/i })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /copiar link do post/i })).toBeInTheDocument();
    });

    it('calls navigator.share with the title and full URL', async () => {
      await renderShareBar({ title: 'Meu Post' });
      const btn = await screen.findByRole('button', { name: /escolher um app/i });
      await act(async () => { fireEvent.click(btn); });
      expect(mockShare).toHaveBeenCalledWith({
        title: 'Meu Post',
        url: expect.stringContaining('/blog/test-post'),
      });
    });

    it('ignores the rejection when the share sheet is dismissed', async () => {
      mockShare.mockRejectedValueOnce(new DOMException('cancelled', 'AbortError'));
      await renderShareBar({ title: 'Meu Post' });
      const btn = await screen.findByRole('button', { name: /escolher um app/i });
      await act(async () => { fireEvent.click(btn); });
      expect(mockShare).toHaveBeenCalledTimes(1);
    });

    it('has no accessibility violations', async () => {
      const { container } = await renderShareBar({ title: 'Meu Post' });
      await screen.findByRole('button', { name: /escolher um app/i });
      expect(await axe(container)).toHaveNoViolations();
    }, 15000);
  });

  it('has no accessibility violations', async () => {
    const { container } = await renderShareBar({ title: 'Meu Post' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);

  it('has no accessibility violations in copied state', async () => {
    const { container } = await renderShareBar({ title: 'Meu Post' });
    const btn = screen.getByRole('button', { name: /copiar link/i });
    await act(async () => { fireEvent.click(btn); });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);
});
