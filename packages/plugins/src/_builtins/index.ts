import type { ComponentType } from "react";
import type { PluginManifest } from "@lifehacker/core";

// Lazy-loaded component variables (declared first, populated later)
let HomeView: ComponentType = () => null;
let SettingsView: ComponentType = () => null;

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

export function setHomeComponent(component: ComponentType) {
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

export function setSettingsComponent(component: ComponentType) {
  SettingsView = component;
}

export { settingsPlugin };
