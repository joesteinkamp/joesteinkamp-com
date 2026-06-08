# joesteinkamp.com — Rebuild Spec & Architecture

A craft-forward personal site for a product design & design-engineering leader. The site is itself a portfolio piece, and is built to be maintained primarily by AI agents through a safe, reviewable Git pipeline.

## 1. Goals & audience

- **Goals (priority order):** personal brand / thought leadership → showcase the work → career & opportunities.
- **Primary audience:** design + engineering peers (the craft community). Secondary: hiring managers, recruiters.
- **Centerpiece:** a hybrid **"now" hub** homepage — what Joe is building, writing, and shipping right now, refreshed automatically.
- **Aesthetic:** **bold experimental** — oversized type, vivid color, an animated hero, playful cursor/scroll interactions. It should *feel* engineered, not templated.

## 2. Non-negotiable constraints

- **Self-hosted** on Joe's own Ubuntu box (`jsweb.joesteinkamp.com`). No Vercel/Netlify runtime. Served by **nginx**.
- **Low ongoing effort.** No CMS to babysit, no database, no plugins to patch (the WordPress pain we're escaping).
- **Agent-maintainable.** Content is plain files in Git; agents propose changes via PR; Joe approves.

## 3. Recommended stack

**Astro (static output) + nginx.** Rationale:

- **Static-first** → builds to plain HTML/CSS/JS. Nothing long-lived to crash or patch on the box; nginx just serves files. This is the lowest-maintenance, most robust option for a self-hosted site.
- **Markdown-native content collections** → writing and projects are `.md`/`.mdx` files with typed frontmatter. Perfect for agents (and for migrating WordPress posts) and for `git diff` review.
- **Islands architecture** → the bold animated hero / interactive bits ship as a single hydrated component (vanilla + GSAP/Canvas, or a Svelte/React island) while the rest stays static and fast.
- **Build-time data fetch** → GitHub activity is pulled during the build via the GitHub API and baked in. No runtime API server needed; freshness comes from scheduled rebuilds.

> Next.js static export would also work, but Astro is the cleaner fit for content + self-host + minimal maintenance. We keep the option to add a tiny API service later only if something truly dynamic is needed (e.g. a contact form).

## 4. Information architecture (v1)

```
/                 Home — the "now" hub (building / writing / shipping)
/work             Projects + live GitHub feed
/work/[slug]      Individual project / case study
/writing          Essays & notes (markdown)
/writing/[slug]   Individual post
/about            Bio, career, positioning, resume link
/hhmm             Halloween Horror Movie Month archive (personality feature)
```

**Home "now" hub** composes: a short status line ("currently…"), latest GitHub activity, most recent writing, featured projects, and a HHMM teaser in season.

## 5. Content model (Git as the CMS)

```
src/content/
  writing/      *.md   — title, date, tags, summary, draft
  projects/     *.md   — title, role, year, stack[], links, repo, featured, cover
  hhmm/         *.md   — year, films[], notes
  now.md               — the editable "currently" block on the homepage
data/
  github.json          — generated at build time (do not hand-edit)
```

Frontmatter is validated by Astro content-collection schemas, so a malformed agent PR fails the build instead of shipping broken content.

## 6. The agent automation pipeline (the headline feature)

**Contract:** agents *propose*, Joe *approves*, merge *deploys*.

```
┌─ Scheduled agent (cron / GH Action / Claude Code routine) ─┐
│  • pull recent GitHub repos & activity                     │
│  • detect new/updated repos → draft a project entry        │
│  • draft "now" updates; suggest writing from notes         │
│  • open a Pull Request (one PR per change set)             │
└───────────────────────────────────────────────────────────┘
                         │  PR
                         ▼
        Joe reviews the diff & merges  ──►  main
                         │
                         ▼
┌─ GitHub Action on push to main ───────────────────────────┐
│  1. npm ci && npm run build  (fetches GitHub data)         │
│  2. rsync dist/ over SSH to the Ubuntu box                 │
│  3. atomic symlink swap → nginx serves new release         │
└───────────────────────────────────────────────────────────┘
```

- **A scheduled rebuild** (e.g. nightly GH Action) re-runs the build so the GitHub feed stays current without any content change.
- **`AGENTS.md`** in the repo root documents the content schemas and rules so any agent (Claude Code or otherwise) can contribute safely.
- **Secrets:** an SSH deploy key + GitHub API token live in GitHub Actions secrets, never in the repo.

## 7. Deploy & cutover

- **Phase 1 — stage:** deploy the new site to `jsweb.joesteinkamp.com` behind nginx (separate server block / docroot). WordPress keeps running at the apex.
- **Phase 2 — validate:** content migrated, links checked, performance/SEO verified on the subdomain.
- **Phase 3 — swap:** point `joesteinkamp.com` docroot at the new build, redirect old WordPress URLs, retire WordPress (keep a DB/file export as archive).
- **Releases** live in `/var/www/joesteinkamp/releases/<timestamp>` with a `current` symlink for instant rollback.

## 8. WordPress migration recommendation

After reviewing the live sitemap:

- **Migrate (the gems):** the design/thought-leadership essays — *The Perversion of MVP*, *Post-Boarding*, *Product Experience Attributes*, *Best Designed SaaS Products (2024)*, the *Disciplines Hexagon*, and the "favorite diagrams/definitions" posts. These carry the brand.
- **Rewrite selectively:** the 2–3 strongest Walgreens portfolio projects as modern case studies; drop the rest.
- **Keep & feature:** **Halloween Horror Movie Month (I–XVII, still active in 2026)** — Joe's signature annual series and the most consistently maintained content. Give it its own `/hhmm` section; it's a great human hook.
- **Archive / drop:** the 2016-era technical how-tos (shell scripts, Sublime setup, etc.) — stale and off-brand. Keep a static export for safety.

## 9. Build order

1. **Spec** (this doc) ✅
2. **Mockup** — self-contained HTML of the bold homepage to lock the look (`mockups/home.html`).
3. **Scaffold** — Astro project, content schemas, `AGENTS.md`, GitHub Action deploy, nginx config; deploy skeleton to the subdomain.
4. Migrate the gem essays + HHMM; wire the GitHub feed; cut over.

## 10. Open questions for later

- GitHub username/handle to wire the feed to.
- Resume: link to PDF, or render from data?
- Contact: mailto only, or a form (would need the tiny API service)?
- Domain registrar/DNS access for the apex swap.
