# Design Principles — joesteinkamp.com

This document defines the design language for the site and the rules anyone (human or agent) should follow when adding or changing UI. The single source of truth for actual values is `src/styles/global.css` (`:root`), and the live reference is the `/design` page. **Code is canonical; this file explains intent.** If the two ever disagree, fix the drift — don't let this doc rot.

---

## 1. Philosophy

The site is a **dark, brutalist-leaning, neon-accented personal site** built for speed and clarity. Five governing ideas:

1. **Content first, chrome second.** Typography and whitespace carry the design. Decoration (glow, cursor, gradients) is subtle and never competes with reading.
2. **One source of truth.** All design tokens live in `:root` of a single CSS file. No Tailwind, no CSS modules, no component-scoped style sprawl. If you need a value, it should already be a variable — add one rather than hardcoding.
3. **Fluid over fixed.** Sizing scales smoothly with the viewport via `clamp()`. We have exactly **one** media-query breakpoint; everything else flexes.
4. **Performance is a feature.** No client framework, minimal JS (custom cursor, scroll-reveal, and the image lightbox). Static HTML out of Astro. Don't add a dependency to solve a CSS problem.
5. **Self-documenting.** The `/design` page renders real tokens and components so documentation can't silently drift from implementation.

---

## 2. Color

Defined in `src/styles/global.css` `:root`. **Always reference the variable, never the hex.**

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#0a0a0f` | Page background (near-black navy) |
| `--ink` | `#f4f4f0` | Primary text (off-white) |
| `--muted` | `#8a8a99` | Secondary text, meta, breadcrumbs, mono labels |
| `--acid` | `#d4ff00` | **Primary accent** — hover, selection, status dot, active states |
| `--hot` | `#ff2d6b` | Secondary accent — gradients, enlarged cursor |
| `--electric` | `#5b5bff` | Tertiary accent — gradients, background glow |
| `--cyan` | `#00e5ff` | Accent — prose links, gradients |
| `--line` | `rgba(255,255,255,.10)` | Borders, dividers, hairlines |

**Rules**
- The theme is **dark-only**. There is no light mode and no theme toggle — don't add one without an explicit decision.
- **One accent does the work at a time.** `--acid` is the default interactive accent (hover, focus, current-page). The other three (`--hot`, `--electric`, `--cyan`) appear almost exclusively inside gradients, not as solid UI fills.
- Gradient emphasis uses the fixed sequence `linear-gradient(90deg, var(--hot), var(--electric), var(--cyan))` (e.g. `.tag em`). Reuse it; don't invent new gradient stops casually.
- Project-card gradient variants (`.proj.p1`–`.p4`) are the sanctioned palette for tiles. Pick from those four rather than authoring new ones.
- Maintain WCAG AA contrast: `--ink` on `--bg` passes; `--muted` is for non-essential text only — never body copy.

---

## 3. Typography

Two families, loaded from Google Fonts (`Space Grotesk` 400/500/700, `JetBrains Mono` 400/500).

| Token | Stack | Use |
|-------|-------|-----|
| `--font` | `"Space Grotesk", system-ui, …` | Display + body |
| `--mono` | `"JetBrains Mono", ui-monospace, …` | Labels, meta, nav, breadcrumbs, code, kickers |

**The monospace = "machine voice" convention.** Mono is reserved for structural/metadata text — nav links, eyebrows/kickers, dates, tags, breadcrumbs, section indices. Prose and headings are always `--font`. Keep this distinction; it's the backbone of the visual identity.

**Scale (fluid, via `clamp`)**
- `h1.display` — `clamp(3.2rem, 13vw, 11rem)`, weight 700, `line-height:.86`, `letter-spacing:-.04em`, uppercase. The hero showpiece; second line uses a `-webkit-text-stroke` outline.
- `.page-head h1` — `clamp(2.4rem, 7vw, 4.5rem)`, interior page titles.
- `.sec-head h2` — `clamp(1.6rem, 4vw, 2.6rem)`.
- `.tag` (lead paragraph) — `clamp(1.1rem, 2.6vw, 1.9rem)`, weight 500.
- `.prose` (body) — `1.12rem`, `line-height:1.7`. This is the only place line-height opens up; body default is `1.2`.
- Mono meta/labels — `12–14px`, often `letter-spacing:.1em`.

**Rules**
- Tighten tracking as type grows (display is `-.04em`); never letter-space large display type loosely.
- Keep reading measure narrow: `.prose` caps at `720px`. Don't run body text the full `1200px`.
- New headings should slot into the existing scale, not introduce a new size.

---

## 4. Layout & Spacing

**Containers**
- `.wrap` — `max-width:1200px`, `padding:0 24px`. The default page container.
- `.prose` — `max-width:720px`. Reading contexts (articles, about).
- `.resume` — `max-width:760px`.

**Spacing language** — viewport-relative for vertical rhythm, fixed for component internals.
- Section vertical padding: `9vh 0` (hero `8vh 0 6vh`).
- Nav: `padding:20px clamp(20px,5vw,48px)`, full-bleed, sticky, `backdrop-filter:blur(8px)`.
- Footer: `padding:50px 0 80px`, `margin-top:6vh`.
- Card padding: `26px`. Common gaps: `18px` (card grids), `20px`, `26px` (nav), `14px`/`8px` (rows/pills).

**Grids** — two columns that collapse to one on mobile.
- `.now` — `minmax(0,1.1fr) minmax(0,1fr)`, `gap:18px`.
- `.work` — `repeat(2, minmax(0,1fr))`, `gap:18px`.
- Use `minmax(0, …)` to prevent blowout; full-width items use `grid-column:1/-1`.

**Rules**
- Prefer the existing gap/padding values over new ones — the set is intentionally small.
- Vertical spacing between major sections is `vh`-based; component internals are `px`-based. Keep that split.

---

## 5. Responsive

**One breakpoint: `@media(max-width:900px)`.** It collapses `.now`/`.work` to a single column, simplifies `.post` and `.resume .role`, and tightens nav gaps.

- Don't add breakpoints to fix sizing — reach for `clamp()` first. A new media query needs a real justification (a layout that genuinely can't flex).
- Everything must be legible and usable from ~320px up. Test the single-column collapse.
- Touch: the custom cursor is hidden under `@media(pointer:coarse)` and the native cursor restored. Any cursor-dependent affordance must have a non-cursor fallback.

---

## 6. Motion & Interaction

Motion is **ambient and restrained** — it signals interactivity, it doesn't perform.

- **Background glow** (`.glow`) — fixed multi-radial gradient drifting on an 18s loop. Decorative, `pointer-events:none`, sits behind everything.
- **Custom cursor** (`.cursor`) — `14px` acid dot, grows to `64px` hot on interactive hover, `mix-blend-mode:difference`. Desktop only.
- **Status dot** (`.dot`) — pulsing acid indicator (1.6s) for "live/now" signals.
- **Scroll reveal** (`.reveal`) — opacity + slight translateY fade-in via IntersectionObserver.
- **Image lightbox** (`<Lightbox />`, lightGallery) — content images in `.prose` open in an in-page viewer. Its chrome is re-themed to site tokens in `global.css` (the `/* lightbox */` block): `--bg` backdrop, mono captions/counter, `--acid` interactive accents. **Every page that renders body content must include the component** (see AGENTS.md). The custom cursor dot hides while the viewer is open (`body.lg-open`).
- **Hover** — links shift `--muted → --ink`; cards lift; the hero arrow nudges and rotates.

**Rules**
- Transitions stay short (`.2s–.3s`) and ease. No bounce, no long durations.
- Keep JS minimal — cursor, reveal, and the lightbox are the only scripted behaviors. Don't add animation libraries.
- Effects must be skippable/harmless: nothing essential should depend on an animation completing, and decorative motion must never block content.

---

## 7. Components

Catalog lives in `global.css` and renders on `/design`. Key building blocks: `nav`, `header.hero`, `.kicker`, `.tag`, `.sec-head`, `.now`/`.card`/`.feed`, `.work`/`.proj`, `.posts`/`.post`, `.hhmm`, `.btn`, `.pillz`/`.pill`, `footer`, `.page-head`/`.ey`/`.back`, `.prose`, `.resume`.

**Rules**
- **Reuse before you create.** Check `/design` and `global.css` first. Most new UI is a recomposition of existing classes.
- New shared styles go in `global.css` as semantic classes — not inline styles, not a new stylesheet.
- When you add a reusable component or token, **add it to the `/design` page** so the living reference stays complete.

---

## 8. Accessibility

- Semantic HTML always: real `<nav>`, `<section>`, `<article>`, `<footer>`, ordered heading hierarchy (one `h1` per page).
- Current page marked with `aria-current="page"` (styled via the same rule as `:hover`).
- Provide meaningful `alt` text for content images. `.prose img/video` are constrained to `max-width:100%`.
- Don't convey meaning by color alone — pair accent color with text, weight, or position.
- Respect the contrast rules in §2; `--muted` never carries essential content.
- The custom cursor and decorative motion must never remove a standard affordance (focusability, hit area, readability).

---

## 9. Adding or Changing Design — Checklist

1. Can existing tokens/classes do it? If yes, use them.
2. New value? Add a `:root` variable instead of hardcoding.
3. New sizing? Try `clamp()` before a media query.
4. New accent use? Default to `--acid`; reserve the other three for gradients.
5. Mono only for metadata/structural text; `--font` for prose and headings.
6. Added a reusable component/token? Update `/design`.
7. Verify: dark theme intact, AA contrast, 900px collapse works, touch fallback present, JS still minimal.
