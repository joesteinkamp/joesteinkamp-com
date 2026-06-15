---
title: Agent Global Instructions
year: 2026
role: Open Source
summary: A portable AI instruction set — write your coding preferences once, render them as CLAUDE.md, AGENTS.md, or Gemini config — with an interactive shell customizer for personal and team use.
stack: [Shell, AI, Developer Tooling]
repo: https://github.com/joesteinkamp/agent-global-instructions
featured: false
accent: p4
order: 13
---

The fragmentation problem: every AI coding tool (Claude Code, Codex, Gemini, Cursor) has its own config file format, but the preferences you'd put in them are the same. Write once, maintain separately, drift apart.

Agent Global Instructions solves this with a template-based rendering system. Answer a short set of questions through an interactive bash script; get back a personalized set of instruction files for whichever tools you use. Three optional layers — instructions (guidance), commands (workflow shortcuts like `/ship`, `/pr`, `/save`), and hooks (automated enforcement and audit logging) — that you can take any or all of.

Individual answers stay local (gitignored). The template itself is the shared artifact — useful for teams that want consistent AI assistant behavior without prescribing every personal preference.

Companion to `agents-md`, focused on the global/personal layer rather than the per-project layer.
