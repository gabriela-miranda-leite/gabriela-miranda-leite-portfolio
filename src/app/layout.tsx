import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gabi Miranda',
  description: 'Frontend & Mobile Developer — Design systems, acessibilidade e UX.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
