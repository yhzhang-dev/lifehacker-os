# Lifehacker OS — Engineering Constitution

## Project Vision

This project is not a typical application.

It is a lifelong personal system designed to evolve with its owner.

The goal is to build a **Lifehacker Operating System**:
a local-first, AI-native, extensible personal infrastructure that can be used for decades.

Every technical decision must favor:

* longevity over trend
* ownership over convenience
* simplicity over complexity
* evolution over completion

The system should remain understandable and maintainable by a single developer long-term.

---

## Core Architecture Principles

### 1. Local First

All critical data must live locally.

Cloud services are optional enhancements, never dependencies.

The system must function fully offline.

Primary data ownership belongs to the user.

---

### 2. Data Longevity

Data must survive framework changes.

Preferred formats:

* SQLite database
* Markdown files
* JSON exports

Avoid proprietary storage formats.

All data should remain readable without the application.

---

### 3. Modular System Design

Design everything as modules.

Future self must be able to:

* remove features safely
* add new capabilities
* rewrite UI without touching core data

Structure:

/core
/plugins
/ai
/ui
/storage

---

### 4. AI-Native Design

AI is a first-class system component.

The system should support:

* local models (Ollama)
* cloud models (OpenAI / Anthropic)
* agent workflows
* long-term memory integration

AI must assist cognition, not replace agency.

---

### 5. Technology Stack

Platform:

* Tauri (Rust backend + Web frontend)

Frontend:

* React
* TypeScript
* TailwindCSS
* shadcn/ui
* Framer Motion

Data Layer:

* SQLite as primary database
* Markdown knowledge storage

AI Layer:

* Ollama for local inference
* API adapters for external LLM providers

Backend Logic:

* Lightweight Rust services
* Minimal server dependency

---

### 6. Development Philosophy

Prefer:

* clear architecture
* explicit types
* composable systems
* readable abstractions

Avoid:

* overengineering
* premature optimization
* heavy backend frameworks
* unnecessary microservices

This is a long-life personal system, not a startup MVP.

---

### 7. User Experience Philosophy

The application should feel like:

* an operating system
* a thinking space
* a personal cockpit

Not a dashboard.
Not a CRUD admin panel.

Interactions should emphasize reflection, awareness, and continuity of life experience.

---

### 8. Plugin System Requirement

All major features must be implementable as plugins.

Plugins should be able to:

* read data
* write insights
* register UI panels
* interact with AI agents

The core must remain small and stable.

---

### 9. Future Compatibility

Assume future integrations:

* wearable devices
* personal analytics
* local AI agents
* new interfaces (AR/VR/voice)

Never hardcode assumptions about interface modality.

---

### 10. Claude Code Role

Claude Code acts as:

* senior architect
* long-term maintainer
* refactoring advisor
* system thinker

When proposing solutions:

* prioritize maintainability
* explain tradeoffs
* suggest evolvable structures
* avoid short-term hacks

Always protect long-term system integrity.
