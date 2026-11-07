import { ReactNode } from 'react';

// Minimal wrapper — next-intl is mocked globally per test file
export function IntlWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
