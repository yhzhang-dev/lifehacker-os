import { useState, useEffect } from "react";
import type { ViewRegistration } from "@lifehacker/core";

// In-memory view store until plugin system is wired
let currentViews: ViewRegistration[] = [];
let currentViewId: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function registerViews(views: ViewRegistration[]) {
  currentViews = views;
  emit();
}

export function navigateTo(viewId: string) {
  currentViewId = viewId;
  emit();
}

export function ScreenManager() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const fn = () => forceUpdate((n) => n + 1);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);

  const activeView = currentViews.find((v) => v.id === currentViewId) ?? currentViews[0];
  const ViewComponent = activeView?.component;

  return ViewComponent ? <ViewComponent /> : null;
}
