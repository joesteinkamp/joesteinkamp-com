// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages with a custom domain (public/CNAME), so the site is
// served at the domain root — no `base` needed. Staging at jsweb.joesteinkamp.com;
// at cutover, change public/CNAME + this `site` to https://joesteinkamp.com.
export default defineConfig({
  site: 'https://jsweb.joesteinkamp.com',
});
