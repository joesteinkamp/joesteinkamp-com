---
title: Auto Screenshotter
year: 2026
role: Design Engineering
summary: A Chrome extension that crawls a web app, scores which pages are worth capturing, and exports them as a numbered ZIP — with optional AI vision to catch dynamic UI states.
stack: [TypeScript, Chrome Extension, Vite, React]
repo: https://github.com/joesteinkamp/auto-screenshotter
featured: false
accent: p1
order: 10
---

Scratch-your-own-itch tooling for capturing a product's UI in bulk. The extension
crawls a site, uses a hybrid scoring model (URL patterns, anchor text, DOM context,
link depth) to decide which pages actually matter, then shoots full-page screenshots
via a scroll-and-stitch approach and exports numbered PNGs with metadata.

Optional AI vision integration — Claude, OpenAI, or Gemini — detects dynamic states
like open menus and expanded accordions that a naive screenshotter misses. Useful
for design system documentation, competitive research, and before/after audits.
