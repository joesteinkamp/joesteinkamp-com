---
title: Design System Skills
year: 2026
role: Open Source
summary: Ten composable AI skills for automating the design-system pipeline — scaffold components, lint against system rules, sync design tokens, inspect Figma, and generate production-ready React code.
stack: [TypeScript, React, Node.js, Figma, AI]
repo: https://github.com/joesteinkamp/design-system-skills
featured: false
accent: p3
order: 12
---

Design systems have always had a gap between the rules ("use the spacing scale, don't hardcode hex values, document every variant") and the enforcement ("the PR got through anyway"). These skills close that gap at the agent layer.

Ten skills, each composable with the others: scaffold a new component to spec, lint existing code against the system's rules, sync design tokens from Figma into the codebase, inspect Figma files for violations, generate typed React code from a component definition, and document what was built. They work with any AI provider (Claude, OpenAI, or whatever's next) and integrate with Figma via MCP.

The broader insight: design system work is mostly constraint application — and constraint application is something agents are genuinely good at when the constraints are written down clearly.
