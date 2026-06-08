// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages with a custom domain (public/CNAME), so the site is
// served at the domain root — no `base` needed. Staging at jsweb.joesteinkamp.com;
// at cutover, change public/CNAME + this `site` to https://joesteinkamp.com.
export default defineConfig({
  site: 'https://jsweb.joesteinkamp.com',
  // Dev only (ignored at build): lets `npm run dev -- --host 0.0.0.0` be reached
  // over Tailscale MagicDNS (e.g. http://clawbot.crane-cod.ts.net:4321) instead of
  // an SSH tunnel. NOTE: `astro preview` has a separate host check this does NOT
  // affect — to view the built site over Tailscale, serve dist/ with a plain
  // static server: `python3 -m http.server 4321 --bind 0.0.0.0 --directory dist`.
  vite: {
    server: { allowedHosts: ['.ts.net'] },
  },
});
