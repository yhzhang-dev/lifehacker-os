import { getViews, getActiveViewId, navigateTo, subscribe } from "../screen/ScreenManager";
import { useState, useEffect } from "react";

export function Sidebar() {
  const [, forceUpdate] = useState(0);

  useEffect(() => subscribe(() => forceUpdate((n) => n + 1)), []);

  const views = getViews().filter((v) => v.position === "nav");
  const activeId = getActiveViewId();

  return (
    <nav className="flex w-48 flex-col border-r border-border bg-muted/20 p-2">
      <div className="flex flex-col gap-1">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => navigateTo(view.id)}
            className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
              (activeId ?? views[0]?.id) === view.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
