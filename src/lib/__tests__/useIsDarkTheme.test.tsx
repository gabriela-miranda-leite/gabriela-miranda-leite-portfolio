import { renderHook } from '@testing-library/react';
import { useIsDarkTheme } from '../useIsDarkTheme';

describe('useIsDarkTheme', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to dark', () => {
    const { result } = renderHook(() => useIsDarkTheme());
    expect(result.current).toBe(true);
  });

  it('returns false when data-theme is light', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    const { result } = renderHook(() => useIsDarkTheme());
    expect(result.current).toBe(false);
  });
});
