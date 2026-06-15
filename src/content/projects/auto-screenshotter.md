---
title: Auto Screenshotter
year: 2026
role: Design Engineering
summary: A Chrome extension that ranks every link on a site by user-flow importance, screenshots the pages that matter, and captures interactive states — dropdowns, accordions, menus — with AI vision.
stack: [TypeScript, Chrome Extension, React, AI]
repo: https://github.com/joesteinkamp/auto-screenshotter
featured: false
accent: p1
order: 10
---

Most screenshot tools capture everything. This one decides what matters first.

Auto Screenshotter crawls a site and scores each discovered URL using a hybrid scorer — URL patterns, anchor text, DOM positioning, crawl depth — to prioritize the pages that actually represent user flows (signup, pricing, core features) and skip boilerplate (privacy policy, cookie notice). The result is a ZIP of the high-signal pages, not a dump of every route.

Optionally, Claude, GPT-4o, or Gemini can scan each page for interactive elements — dropdowns, accordions, hamburger menus — and trigger them to capture multiple states. A scroll-and-stitch engine handles long pages. Output lands in IndexedDB and bundles to a downloadable archive.

The underlying bet: a smart screenshotter is more useful than a fast one.
