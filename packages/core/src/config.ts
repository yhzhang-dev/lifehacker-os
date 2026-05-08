import type { AppConfig } from "./types";

export class ConfigManager {
  private cache = new Map<string, string>();
  private store: { get: (key: string) => Promise<string | null>; set: (key: string, value: string) => Promise<void> };

  constructor(store: {
    get: (key: string) => Promise<string | null>;
    set: (key: string, value: string) => Promise<void>;
  }) {
    this.store = store;
  }

  async get(key: string): Promise<string | null> {
    if (this.cache.has(key)) return this.cache.get(key) ?? null;
    const value = await this.store.get(key);
    if (value !== null) this.cache.set(key, value);
    return value;
  }

  async set(key: string, value: string): Promise<void> {
    this.cache.set(key, value);
    await this.store.set(key, value);
  }

  async getAppConfig(): Promise<AppConfig> {
    const theme = (await this.get("theme")) ?? "dark";
    return { theme: theme as AppConfig["theme"] };
  }
}
