import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

jest.mock('shiki', () => ({
  codeToHtml: jest.fn().mockResolvedValue('<pre><code>const x = 1;</code></pre>'),
}));

function CodeBlockStub({ lang = 'ts' }: { lang?: string }) {
  return (
    <figure aria-label={`Bloco de código em ${lang}`}>
      <figcaption>{lang}</figcaption>
      <div dangerouslySetInnerHTML={{ __html: '<pre><code>const x = 1;</code></pre>' }} />
    </figure>
  );
}

describe('CodeBlock (structure)', () => {
  it('renders figure with aria-label naming the language', () => {
    render(<CodeBlockStub lang="typescript" />);
    expect(screen.getByRole('figure', { name: /typescript/i })).toBeInTheDocument();
  });

  it('shows the language label in figcaption', () => {
    render(<CodeBlockStub lang="tsx" />);
    expect(screen.getByText('tsx')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CodeBlockStub lang="ts" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
