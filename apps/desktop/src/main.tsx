import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ui/theme/ThemeProvider";
import { AppShell } from "./ui/layout/AppShell";
import { DailyLog } from "./daily-log/DailyLog";
import { registerViews } from "./ui/screen/ScreenManager";
import { HomeScreen } from "./ui/screen/HomeScreen";
import "./index.css";

// Register views
registerViews([
  {
    id: "home",
    label: "Home",
    position: "nav",
    component: HomeScreen,
  },
  {
    id: "daily-log",
    label: "Daily Log",
    position: "nav",
    component: DailyLog,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider initial="dark">
      <AppShell />
    </ThemeProvider>
  </StrictMode>,
);
