# AGENTS.md — how AI agents maintain this site

This site is designed to be updated mostly by AI agents. The contract is simple:

> **Agents propose (open a PR). Joe approves (merges). Merge deploys.**

Never push directly to `main`. Never edit the live server. Always open a pull
request with a focused change set and a clear description.

## What you can safely change

All site content is plain files in Git. Editing these is safe — a malformed file
fails the build (via schema validation) instead of shipping broken:

| Content              | Location                       | Notes |
|----------------------|--------------------------------|-------|
| Writing / essays     | `src/content/writing/*.md`     | Schema in `src/content/config.ts` |
| Projects / case studies | `src/content/projects/*.md` | `featured: true` surfaces it on the homepage |
| HHMM editions        | `src/content/hhmm/*.md`        | One file per year |
| "Now" block          | `src/data/now.json`            | The homepage "Currently" + pills |
| Resume               | `src/data/resume.ts`           | Renders `/resume` |
| Site config / socials | `src/config/site.ts`          | Name, location, nav, links |

**Do not hand-edit** `src/data/github.json` — it is regenerated every build by
`scripts/fetch-github.mjs`.

## Frontmatter schemas (must validate)

**Writing** (`src/content/writing/<slug>.md`)
```yaml
title: string            # required
date: YYYY-MM-DD         # required
summary: string          # optional, used in lists/SEO
tags: [string]           # optional
draft: true|false        # optional, default false (drafts are hidden)
external: https://...     # optional; if set, the entry links out
```

**Projects** (`src/content/projects/<slug>.md`)
```yaml
title: string            # required
year: number|string
role: string
summary: string
stack: [string]
repo: https://...
link: https://...
featured: true|false     # show on homepage
accent: p1|p2|p3|p4      # card gradient
order: number            # sort order (lower = first)
```

**HHMM** (`src/content/hhmm/<year>.md`)
```yaml
year: number             # required
title: string            # required, e.g. "Halloween Horror Movie Month XVII"
films: number
summary: string
```

## Routine agent jobs

1. **GitHub → projects.** When a notable new repo appears for `joesteinkamp`,
   draft a `src/content/projects/<slug>.md` entry (summary, stack, repo link).
   Do not mark `featured` without asking — that changes the homepage.
2. **Refresh the "now" block.** Propose updates to `src/data/now.json` when the
   current focus changes.
3. **Migrate / draft writing.** Add posts as `src/content/writing/*.md` with
   `draft: true` until reviewed.
4. **HHMM season.** Each fall, scaffold the new year's edition file.

## Workflow rules

- **One PR per logical change.** Title: `content: add project "X"`, `content: now update`, etc.
- **Validate before opening a PR:** run `npm run build` (or `npm run check`). If it
  fails, fix it — do not open a red PR.
- **Stay in your lane.** Content and data files only. Changes to layout, styles,
  build, or deploy (`src/layouts`, `src/styles`, `src/pages`, `astro.config.mjs`,
  `.github/`, `deploy/`) need an explicit human request. When such a change *is*
  requested, follow the design principles in [`DESIGN.md`](./DESIGN.md).
- **No secrets, ever.** Deploy keys and tokens live only in GitHub Actions secrets.
- **Voice:** confident, plain, no buzzwords. Title Case for headings/labels/nav;
  sentence case for body prose. Don't add "written by AI" disclaimers.

## How deploy works (context)

`npm run build` runs `scripts/fetch-github.mjs` (writes `github.json`) then
`astro build` → static files in `dist/`. On merge to `main`, the
`Build & Deploy` workflow publishes `dist/` to **GitHub Pages**. A nightly run
rebuilds to refresh the GitHub feed. See `SPEC.md` for the full picture.
