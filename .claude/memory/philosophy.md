---
name: Philosophy
description: Engineering, design, and UX philosophy extracted from CLAUDE.md and identity.md
type: reference
---

# Lifehacker OS Philosophy

## Engineering Principles (from CLAUDE.md §6)
Prefer:
- Clear architecture
- Explicit types
- Composable systems
- Readable abstractions

Avoid:
- Overengineering
- Premature optimization
- Heavy backend frameworks
- Unnecessary microservices

## UX Philosophy (§7)
Should feel like:
- An operating system
- A thinking space
- A personal cockpit

NOT a dashboard. NOT a CRUD admin panel.

Interactions emphasize reflection, awareness, and continuity of life experience.

## Architecture (§3)
Design everything as modules. Core structure:
```
/core     — small, stable skeleton
/plugins  — all major features as plugins
/ai       — local + cloud AI adapters
/ui       — replaceable presentation layer
/storage  — durable data layer
```

## Data Longevity (§2)
- SQLite primary database
- Markdown knowledge storage
- JSON exports
- Must survive framework changes
- Readable without the application

## AI-Native (§4)
- AI is first-class system component
- Support local (Ollama) + cloud (Anthropic/OpenAI)
- AI assists cognition, does NOT replace agency

## Tech Stack (§5)
- Tauri (Rust + Web)
- React / TypeScript / TailwindCSS / shadcn/ui / Framer Motion
- SQLite + Markdown
- Ollama + external LLM API adapters

## Plugin System (§8)
Plugins can:
- Read data
- Write insights
- Register UI panels
- Interact with AI agents

Core must remain small and stable.

## Future Compatibility (§9)
Assume future: wearables, personal analytics, local AI agents, AR/VR/voice.
Never hardcode assumptions about interface modality.

## Claude Code Role (§10)
Acts as: senior architect, long-term maintainer, refactoring advisor, system thinker.
Always protect long-term system integrity.

**Why:** These principles form the constitution. Every code decision is measured against them.

**How to apply:** Use this document as a checklist when evaluating any technical choice. If a proposal violates any principle, flag it and suggest alternatives.
