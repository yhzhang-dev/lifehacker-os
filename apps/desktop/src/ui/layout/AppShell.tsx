import { type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
import { ScreenManager } from "../screen/ScreenManager";

export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-dvh w-dvw flex-col overflow-hidden bg-background">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children ?? <ScreenManager />}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
