import type { ComponentType } from "react";

/** Unique plugin identifier in kebab-case (e.g. "life-events") */
export type PluginId = string;

/** Unique view identifier */
export type ViewId = string;

/** Unique command identifier */
export type CommandId = string;

// ── Plugin System ──────────────────────────────────────────

export interface PluginManifest {
  id: PluginId;
  name: string;
  version: string;
  description?: string;
  author?: string;
  onActivate?: (ctx: PluginContext) => Promise<void>;
  onDeactivate?: () => Promise<void>;
  views?: ViewRegistration[];
  commands?: CommandRegistration[];
}

export interface PluginContext {
  events: EventBus;
  storage: StorageAPI;
  config: ConfigAPI;
}

export interface ViewRegistration {
  id: ViewId;
  label: string;
  icon?: string;
  component: ComponentType;
  position: "nav" | "main";
}

export interface CommandRegistration {
  id: CommandId;
  label: string;
  shortcut?: string;
  handler: () => void;
}

// ── API interfaces provided to plugins ─────────────────────

export interface EventBus {
  on<K extends keyof LifehackerEventMap>(
    event: K,
    handler: (payload: LifehackerEventMap[K]) => void,
  ): () => void;
  emit<K extends keyof LifehackerEventMap>(
    event: K,
    payload: LifehackerEventMap[K],
  ): void;
  once<K extends keyof LifehackerEventMap>(
    event: K,
    handler: (payload: LifehackerEventMap[K]) => void,
  ): void;
}

export interface StorageAPI {
  query<T = Record<string, unknown>>(
    sql: string,
    params?: unknown[],
  ): Promise<T[]>;
  execute(sql: string, params?: unknown[]): Promise<void>;
}

export interface ConfigAPI {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

// ── Event System ───────────────────────────────────────────

export interface LifehackerEventMap {
  "app:ready": Record<string, never>;
  "app:before-quit": Record<string, never>;
  "plugin:activated": { pluginId: PluginId };
  "plugin:deactivated": { pluginId: PluginId };
  "plugin:error": { pluginId: PluginId; error: unknown };
  "theme:changed": { theme: "dark" | "light" };
  "command:executed": { commandId: CommandId };
  "navigation:changed": { viewId: ViewId; params?: Record<string, string> };
  "config:changed": { key: string; value: unknown };
  "storage:ready": Record<string, never>;
  "storage:migration-applied": { version: number; name: string };
}

// ── App Config ─────────────────────────────────────────────

export interface AppConfig {
  theme: "dark" | "light";
}
