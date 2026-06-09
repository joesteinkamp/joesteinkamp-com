---
title: "The product brief for your AI agents"
date: 2026-06-09
summary: "AI coding agents work better when you treat them like a new collaborator who needs a real brief — not just a prompt. Here's the pattern I've been using."
tags: [ai, design, engineering, process]
draft: true
---

There's a pattern I keep coming back to when I set up a project that AI agents will work on: write them a brief.

Not a prompt. A brief. The kind of document you'd hand a contractor who's joining a project mid-stream: here's what we're building, here's who it's for, here are the things we don't touch without a conversation.

I've been calling this the AGENTS.md pattern. The idea is simple — you put a set of files at the root of a project that every AI tool reads before doing anything. AGENTS.md is the main one, but the useful version of this lives across four files:

- **AGENTS.md** — the governance contract: what the agent can safely change, how to propose changes (open a PR, don't push to main), how to validate before shipping
- **PRODUCT.md** — what the product actually does, who it's for, what problems it solves
- **DESIGN.md** — the visual language, the component vocabulary, what "good" looks like
- **CODE.md** — the stack, the patterns, the rules that make the codebase consistent

Separately, there are *skills* — named workflows the agent can run on demand. Skills are different from rules. Rules are always on ("never commit secrets"). Skills are invoked ("run the weekly maintenance pass"). The separation matters once you have more than one agent or more than a handful of rules.

## Why this works

The thing I've noticed is that the quality of AI agent output scales with the specificity of the context you give it. A general "help me build a React app" prompt gets you generic React. But if the agent has read a product brief, understands the design system, and knows which files it's allowed to touch, it acts more like a collaborator than a code generator.

This mirrors something that's obvious in design work: good output from anyone — contractor, vendor, new hire — requires giving them real context. A design brief isn't about restricting the work, it's about making sure the work is actually aimed at the right problem. AGENTS.md is the same thing for AI tools.

## What changes in practice

Once I started maintaining these files, a few things shifted:

**Consistency across sessions.** AI agents don't have persistent memory between sessions. Every new conversation is a fresh start. But if the agent reads AGENTS.md and PRODUCT.md first, it picks up context fast — the same way a human reads a briefing document before a meeting.

**The right kind of caution.** When the governance contract is explicit (don't touch layout files, don't push to main, validate the build before opening a PR), the agent applies that caution consistently. You don't have to re-teach it every session.

**Reviewable proposals instead of direct edits.** The PR-first workflow is baked into AGENTS.md for this site. Agents propose; humans approve. That's a design pattern, not just a git workflow — it keeps humans in the loop at exactly the right decision point.

## The design leader angle

I think about this a lot from a design leadership perspective. One of the hardest parts of scaling a design team is ensuring consistency — making sure everyone's working from the same shared understanding of the product, the patterns, and the constraints.

AI agents have the same problem at a smaller scale, faster. If you don't give them the context, they'll make reasonable-sounding choices that are wrong for your specific product. If you do give them the context — in structured, reusable files they read every time — the quality floor goes up dramatically.

The interesting implication is that maintaining this context becomes part of the work. AGENTS.md rots the same way a design brief rots: if the product changes and the brief doesn't, you get misaligned output. Keeping these files current is the new version of keeping your design system current.

---

I've open-sourced the starter kit I use at [github.com/joesteinkamp/agents-md](https://github.com/joesteinkamp/agents-md). It's a shell script that installs the four files into any project and includes example rules and skill templates to start from.
