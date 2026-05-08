import type { ViewRegistration } from "@lifehacker/core";

export function Sidebar() {
  // TODO: Wire up to plugin registry
  const views: ViewRegistration[] = [
    { id: "home", label: "Home", position: "nav", component: () => null },
  ];

  return (
    <nav className="flex w-48 flex-col border-r border-border bg-muted/20 p-2">
      <div className="flex flex-col gap-1">
        {views.map((view) => (
          <button
            key={view.id}
            className="rounded-md px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {view.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
