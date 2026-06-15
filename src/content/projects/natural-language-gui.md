---
title: Natural Language GUI
year: 2026
role: Design Engineering
summary: A bidirectional library that converts React UI state into human-readable markdown and back — so AI agents can read, fill, and drive interfaces without pixel scraping.
stack: [TypeScript, Next.js, React, Radix UI]
repo: https://github.com/joesteinkamp/natural-language-gui
featured: false
accent: p2
order: 11
---

The problem with "AI controlling a UI" is that most approaches treat the interface as a picture: take a screenshot, send it to a vision model, hope it clicks the right thing. That's fragile.

Natural Language GUI takes a different bet: serialize the component's state to structured markdown, let the agent read and respond in the same format, then parse that response back into a rendered component. The interface and the agent speak the same language — literally.

Built on Radix UI primitives with full type safety, so any React component can opt in. The practical applications are broader than they sound: AI form-filling, voice interfaces, test automation, and accessibility tooling all collapse into the same bidirectional contract.

Part of a larger question about what it means for software to be legible to agents, not just to humans.
