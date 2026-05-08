---
name: Project Vision
description: The core mission, identity, and architecture of Lifehacker OS
type: project
---

# Lifehacker OS — Project Vision

## Mission
Build a lifelong personal operating system: local-first, AI-native, extensible personal infrastructure usable for decades. Helps its owner understand life over decades.

## Identity (from identity.md)
Calm, Minimal, Reflective, Long-term thinking, Personal sovereignty

## Soul (from soul.md)
"This system exists to help its owner understand life over decades."

## Current State
Restructured into monorepo layout: .claude/ (AI space), docs/, apps/, packages/. Ready for Tauri scaffolding.

## Project Structure
```
.claude/       ← AI brain (CLAUDE.md, memory/, identity.md, soul.md)
docs/          ← Human & AI readable docs (PROJECT.md, ROADMAP.md, ARCHITECTURE.md, decisions/)
apps/          ← Applications (desktop/ = Tauri app)
packages/      ← Reusable modules (core, storage, ai, plugins)
```

## 4-Phase Roadmap
1. Core System — Tauri setup, local database, basic UI shell
2. Memory System — life events, timeline, knowledge graph
3. AI Companion — local models, reflection engine
4. Plugin Ecosystem

## Key Constraint
This is NOT a demo project. It is a long-life personal system, not a startup MVP.

**Why:** The system must evolve with its owner, survive framework changes, and remain understandable by a single developer for decades.

**How to apply:** Every technical decision favors longevity over trend, ownership over convenience, simplicity over complexity, evolution over completion.
