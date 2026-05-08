import { EventBusImpl } from "./events";
import { PluginRegistry } from "./plugin-registry";
import { ConfigManager } from "./config";
import type { PluginContext, EventBus, StorageAPI } from "./types";

export interface AppContext {
  events: EventBus;
  plugins: PluginRegistry;
  config: ConfigManager;
  storage: StorageAPI;
}

export async function initializeApp(
  storage: StorageAPI,
  configStore: { get: (key: string) => Promise<string | null>; set: (key: string, value: string) => Promise<void> },
): Promise<AppContext> {
  const events = new EventBusImpl();
  const config = new ConfigManager(configStore);
  const plugins = new PluginRegistry();

  const ctx: PluginContext = {
    events,
    storage,
    config,
  };

  // Activate all registered plugins
  await plugins.activateAll(ctx);

  // Signal ready
  events.emit("app:ready", {});

  return { events, plugins, config, storage };
}
