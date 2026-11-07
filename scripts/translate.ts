import Anthropic from '@anthropic-ai/sdk';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const client = new Anthropic();

async function translatePost(ptPath: string) {
  const content = await readFile(ptPath, 'utf-8');

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 8192,
    messages: [
      {
        role: 'user',
        content: `Translate this MDX blog post from Portuguese to English.

Rules:
- Preserve all frontmatter keys exactly (slug stays in PT format)
- Translate: title, excerpt, and all body content
- Keep all MDX components, code blocks, and JSX exactly as-is
- Natural technical English — not literal translation
- Keep the author's voice

${content}`,
      },
    ],
  });

  const translated = (response.content[0] as { type: 'text'; text: string }).text;
  const enPath = ptPath.replace('.pt.mdx', '.en.mdx');
  await writeFile(enPath, translated);
  console.log(`✓ Traduzido: ${path.basename(enPath)}`);
}

const [, , filePath] = process.argv;
if (!filePath) {
  console.error('Uso: npx tsx scripts/translate.ts <post.pt.mdx>');
  process.exit(1);
}

translatePost(filePath).catch(console.error);
