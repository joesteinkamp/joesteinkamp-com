// @ts-check
import { defineConfig } from 'astro/config';

// During staging this is served from jsweb.joesteinkamp.com; flip to the apex at cutover.
export default defineConfig({
  site: 'https://joesteinkamp.com',
});
