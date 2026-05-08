import type {
  PluginManifest,
  PluginContext,
  ViewRegistration,
  CommandRegistration,
  PluginId,
  ViewId,
  CommandId,
} from "./types";

export class PluginRegistry {
  private plugins = new Map<PluginId, PluginManifest>();
  private views = new Map<ViewId, ViewRegistration>();
  private commands = new Map<CommandId, CommandRegistration>();

  register(manifest: PluginManifest): void {
    if (this.plugins.has(manifest.id)) {
      console.warn(`Plugin "${manifest.id}" already registered, skipping`);
      return;
    }
    this.plugins.set(manifest.id, manifest);

    manifest.views?.forEach((view) => {
      this.views.set(view.id, view);
    });
    manifest.commands?.forEach((cmd) => {
      this.commands.set(cmd.id, cmd);
    });
  }

  async activateAll(ctx: PluginContext): Promise<void> {
    for (const [id, plugin] of this.plugins) {
      try {
        await plugin.onActivate?.(ctx);
        ctx.events.emit("plugin:activated", { pluginId: id });
      } catch (error) {
        console.error(`Failed to activate plugin "${id}":`, error);
        ctx.events.emit("plugin:error", { pluginId: id, error });
      }
    }
  }

  async deactivate(id: PluginId): Promise<void> {
    const plugin = this.plugins.get(id);
    if (!plugin) return;
    await plugin.onDeactivate?.();
  }

  getViews(): ViewRegistration[] {
    return [...this.views.values()];
  }

  getCommands(): CommandRegistration[] {
    return [...this.commands.values()];
  }

  getPlugin(id: PluginId): PluginManifest | undefined {
    return this.plugins.get(id);
  }
}
