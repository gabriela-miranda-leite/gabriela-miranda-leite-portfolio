'use client';

import { useTranslations } from 'next-intl';
import type { Freshness } from '@/lib/freshness';

interface FreshBadgeProps {
  kind: Freshness;
  id?: string;
}

const COLORS: Record<Freshness, { color: string; background: string }> = {
  new: { color: 'var(--new)', background: 'var(--new-a)' },
  updated: { color: 'var(--updated)', background: 'var(--updated-a)' },
};

export function FreshBadge({ kind, id }: FreshBadgeProps) {
  const t = useTranslations('freshness');
  const { color, background } = COLORS[kind];

  return (
    <span
      id={id}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 'var(--space-2) var(--space-7)',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-chip)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color,
        background,
        border: `1px solid ${color}`,
      }}
    >
      {t(kind)}
    </span>
  );
}
