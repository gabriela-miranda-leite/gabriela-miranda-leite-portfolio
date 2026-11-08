import { flag } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

/**
 * Feature flags do portfolio.
 *
 * Para adicionar um novo flag:
 *   1. Crie no Vercel Flags dashboard (ou `vercel flags create <key> --kind boolean`)
 *   2. Exporte-o aqui seguindo o mesmo padrão
 *   3. Use com `await portfolioShowAbout()` em Server Components
 */

export const portfolioShowAbout = flag<boolean>({
  key: 'portfolio_show_about',
  description: 'Exibe o link "Sobre" na navegação',
  defaultValue: true,
  options: [
    { value: false, label: 'Oculto' },
    { value: true, label: 'Visível' },
  ],
  adapter: vercelAdapter(),
});
