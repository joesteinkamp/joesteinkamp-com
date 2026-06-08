# joesteinkamp.com

Personal site for Joe Steinkamp — product design & design engineering. Bold and
hand-built on the front, boringly robust on the back: static [Astro](https://astro.build)
output served by nginx on a self-hosted box, maintained largely by AI agents via
pull requests.

- **Design / architecture:** [`SPEC.md`](./SPEC.md)
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

Push/merge to `main` → GitHub Actions builds and rsyncs to the server with an
atomic release + symlink swap. Configure these repo secrets:

`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_KEY` (SSH private key), `DEPLOY_PATH`
(e.g. `/var/www/joesteinkamp`). Sample web server config in
[`deploy/nginx.conf`](./deploy/nginx.conf).
