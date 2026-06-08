# Launch Checklist

Status of getting the new site live at `jsweb.joesteinkamp.com` (staging) and then
swapping the apex over from WordPress. See `SPEC.md` for architecture.

## 1. Go live on the staging subdomain

- [ ] **Merge PR #1** into `main` (the complete site).
- [ ] **Enable Pages** — Settings → Pages → Source: *GitHub Actions* (already set via API; confirm it stuck).
- [ ] **Add DNS:** `CNAME` record `jsweb` → `joesteinkamp.github.io`. Apex stays on WordPress, untouched.
- [ ] Wait for the deploy workflow to finish and GitHub to provision the TLS cert (minutes, up to ~1 hr).
- [ ] Verify **https://jsweb.joesteinkamp.com** loads and pages/images render.

## 2. Contact email

- [ ] Set up **joe@joesteinkamp.com** to receive mail (forward to Gmail, or a mailbox)
      at your domain/email provider. The site links to it but it won't receive until configured.

## 3. Content confirmations

- [ ] **Resume dates** — companies/titles are sourced; the year ranges in
      `src/data/resume.ts` are inferred. Confirm/correct AlphaSense, Tegus, Shiftgig, Walgreens.
- [ ] **AlphaSense title** — confirm "Senior Director, Product Design" vs "Senior Principal Product Designer".
- [ ] Spot-check migrated essays (especially image-heavy: Favorite UX Process Diagrams, Product Experience Attributes).

## 4. Cutover (apex → new site, retire WordPress)

- [ ] Change `public/CNAME` and `site` in `astro.config.mjs` to `https://joesteinkamp.com`.
- [ ] Point apex DNS at GitHub Pages (A/AAAA records) and `www` → `joesteinkamp.github.io`.
- [ ] Add redirects for old WordPress URLs worth preserving (top essays, HHMM).
- [ ] Export/back up the WordPress site + DB as an archive, then decommission it.
- [ ] Verify HTTPS on apex + `www`.

## Nice-to-have (post-launch)

- [ ] Walgreens case-study write-up (currently a stub).
- [ ] HHMM I (2009) — not in WordPress; add `src/content/hhmm/2009.md` if the film list exists.
- [ ] Flesh out the real project entries (Chromo, Sketch to Web, Design Skills) with screenshots.
- [ ] Sitemap + RSS feed for `/writing`.
- [ ] First agent-run content PR to dogfood the `AGENTS.md` pipeline.
