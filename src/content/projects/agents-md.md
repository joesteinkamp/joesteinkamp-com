---
title: agents-md
year: 2026
role: Open Source
summary: A modular AGENTS.md starter kit — four opinionated files that give AI coding agents (Claude, Cursor, Copilot, Aider) a shared context for how your project works.
stack: [Shell, AI, Developer Tooling]
repo: https://github.com/joesteinkamp/agents-md
featured: false
accent: p2
order: 9
---

Four files — AGENTS.md, PRODUCT.md, DESIGN.md, CODE.md — plus an install script.
The core bet: AI agents behave better when the project tells them what it builds,
how it's structured, and which moves are off-limits. This is the reusable scaffold
for that contract, deployable across any project in a single command.

Separates passive constraints (rules every agent reads) from active workflows
(skills that run on demand) — a distinction that matters once you have more than
one agent touching a codebase.

This site runs a version of it.
