# joesteinkamp.com

Personal site for Joe Steinkamp — product design & design engineering. Bold and
hand-built on the front, boringly robust on the back: static [Astro](https://astro.build)
output deployed to **GitHub Pages**, maintained largely by AI agents via
pull requests. Live at **https://joesteinkamp.com**.

- **Design / architecture:** [`SPEC.md`](./SPEC.md)
- **Design principles:** [`DESIGN.md`](./DESIGN.md)
- **How agents maintain it:** [`AGENTS.md`](./AGENTS.md)
- **Approved visual direction:** [`mockups/home.html`](./mockups/home.html)

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # fetches GitHub data, then builds to dist/
npm run preview    # serve the built site locally
```

Set `GITHUB_TOKEN` to raise the GitHub API rate limit (optional locally; provided
automatically in CI). The build is resilient — if the GitHub fetch fails it keeps
the last cached `src/data/github.json` and still ships.

## Edit content

Everything lives as files (see `AGENTS.md` for schemas):

- `src/content/writing/` — essays
- `src/content/projects/` — work & case studies
- `src/content/hhmm/` — Halloween Horror Movie Month
- `src/data/now.json` — homepage "Currently"
- `src/data/resume.ts` — `/resume` page
- `src/config/site.ts` — name, location, nav, social links

## Deploy

Hosted on **GitHub Pages**, live at **https://joesteinkamp.com**. Push/merge to
`main` → the `Build & Deploy` workflow builds and publishes `dist/` to Pages. A
nightly run rebuilds to refresh the GitHub feed. No servers, secrets, or SSH keys
to manage.

The custom domain is set by [`public/CNAME`](./public/CNAME) (`joesteinkamp.com`),
with the apex DNS pointed at GitHub Pages' IP addresses and `www` redirecting to
the apex. HTTPS is enforced via an auto-provisioned certificate.
