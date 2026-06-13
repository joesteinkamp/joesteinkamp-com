# CLAUDE.md — joesteinkamp.com

Start with [`AGENTS.md`](./AGENTS.md) (workflow: agents propose PRs, Joe merges;
what's safe to change; frontmatter schemas) and [`DESIGN.md`](./DESIGN.md)
(design language; tokens live in `src/styles/global.css`, living reference at
`/design`). Both apply to every change here.

## Hard rules

- **Every body-content image opens in the lightbox.** Any page that renders
  markdown body content (`<article class="prose">` + `<Content />`) must include
  `<Lightbox />` (`src/components/Lightbox.astro`). It connects every image in
  the body to the in-page lightGallery viewer automatically — bare images and
  self-linked images open in the viewer; images that deliberately link elsewhere
  keep their link. Never ship a content page whose images navigate to the raw
  file. Image `alt` text doubles as the viewer caption, so write it.
- Validate with `npm run build` before opening a PR.
- Never hand-edit `src/data/github.json` (regenerated every build).
