import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import { FRESH_WINDOW_MS, getFreshness, useFreshness } from './freshness';

const NOW = Date.parse('2026-11-21T12:00:00Z');
const daysAgo = (d: number) => new Date(NOW - d * 24 * 60 * 60 * 1000).toISOString();

describe('getFreshness', () => {
  it('is "new" when created within the last week', () => {
    expect(getFreshness(daysAgo(3), undefined, NOW)).toBe('new');
  });

  it('is "updated" when only the last update is within the week', () => {
    expect(getFreshness(daysAgo(40), daysAgo(2), NOW)).toBe('updated');
  });

  it('prefers "new" over "updated" for something created and pushed this week', () => {
    expect(getFreshness(daysAgo(3), daysAgo(1), NOW)).toBe('new');
  });

  it('is null once the week is over', () => {
    expect(getFreshness(daysAgo(8), daysAgo(8), NOW)).toBeNull();
  });

  it('keeps the label through exactly seven days and drops it right after', () => {
    expect(getFreshness(new Date(NOW - FRESH_WINDOW_MS).toISOString(), undefined, NOW)).toBe('new');
    expect(getFreshness(new Date(NOW - FRESH_WINDOW_MS - 1).toISOString(), undefined, NOW)).toBeNull();
  });

  it('is null without dates', () => {
    expect(getFreshness(undefined, undefined, NOW)).toBeNull();
  });

  it('tolerates an item stamped slightly ahead of the hour-floored clock', () => {
    expect(getFreshness(new Date(NOW + 30 * 60 * 1000).toISOString(), undefined, NOW)).toBe('new');
  });

  it('ignores items dated well in the future', () => {
    expect(getFreshness(daysAgo(-3), undefined, NOW)).toBeNull();
  });
});

describe('useFreshness', () => {
  function Probe({ created, updated }: { created?: string; updated?: string }) {
    return <span data-testid="probe">{useFreshness(created, updated) ?? 'none'}</span>;
  }

  beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(NOW));
  afterEach(() => jest.restoreAllMocks());

  it('renders nothing on the server, so a stale build never keeps a label alive', () => {
    expect(renderToString(<Probe created={daysAgo(1)} />)).toContain('none');
  });

  it('answers from the browser clock on the client', () => {
    render(<Probe created={daysAgo(1)} />);
    expect(screen.getByTestId('probe')).toHaveTextContent('new');
  });

  it('expires the label as time passes', () => {
    jest.spyOn(Date, 'now').mockReturnValue(NOW + 10 * 24 * 60 * 60 * 1000);
    render(<Probe created={daysAgo(1)} />);
    expect(screen.getByTestId('probe')).toHaveTextContent('none');
  });
});
