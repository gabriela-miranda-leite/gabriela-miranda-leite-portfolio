'use client';

import { useTranslations } from 'next-intl';
import { Chip } from './Chip';
import type { Freshness } from '@/lib/freshness';

interface FreshBadgeProps {
  kind: Freshness;
  id?: string;
}

export function FreshBadge({ kind, id }: FreshBadgeProps) {
  const t = useTranslations('freshness');
  return <Chip id={id} label={t(kind)} selected />;
}
