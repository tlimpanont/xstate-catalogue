import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), mdx()],
  site: 'https://tlimpanont.github.io',
  base: '/xstate-catalogue',
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'prism',
  },
});
