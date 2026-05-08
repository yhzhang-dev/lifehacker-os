import type { PluginManifest } from "@lifehacker/core";

// ── Home Plugin ────────────────────────────────────────────

const homePlugin: PluginManifest = {
  id: "home",
  name: "Home",
  version: "0.1.0",
  description: "Default home screen",
  views: [
    {
      id: "home",
      label: "Home",
      position: "nav",
      component: HomeView,
    },
  ],
};

// Lazy-loaded component to avoid circular deps
let HomeView: React.ComponentType = () => null;

export function setHomeComponent(component: React.ComponentType) {
  HomeView = component;
}

export default homePlugin;

// ── Settings Plugin ────────────────────────────────────────

const settingsPlugin: PluginManifest = {
  id: "settings",
  name: "Settings",
  version: "0.1.0",
  description: "Application settings",
  views: [
    {
      id: "settings",
      label: "Settings",
      position: "nav",
      component: SettingsView,
    },
  ],
};

let SettingsView: React.ComponentType = () => null;

export function setSettingsComponent(component: React.ComponentType) {
  SettingsView = component;
}

export { settingsPlugin };
