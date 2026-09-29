import { defineConfig } from 'astro/config';
import { site } from './src/data/site.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
