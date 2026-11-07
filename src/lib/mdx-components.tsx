import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/ui/CodeBlock';

type PreProps = React.ComponentPropsWithoutRef<'pre'>;

function Pre({ children }: PreProps) {
  const child = children as React.ReactElement<{ className?: string; children?: string }>;
  const className = child?.props?.className ?? '';
  const lang = className.replace('language-', '') || 'text';
  const code = String(child?.props?.children ?? '').trim();
  return <CodeBlock code={code} lang={lang} />;
}

export const mdxComponents: MDXComponents = {
  pre: Pre,
};
