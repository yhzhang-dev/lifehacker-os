import { useTheme } from "../theme/ThemeProvider";

export function TopBar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="flex h-10 items-center justify-between border-b border-border px-4">
      <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Lifehacker OS
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </header>
  );
}
