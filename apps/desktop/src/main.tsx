import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ui/theme/ThemeProvider";
import { AppShell } from "./ui/layout/AppShell";
import { HomeScreen } from "./ui/screen/HomeScreen";
import { registerViews } from "./ui/screen/ScreenManager";
import "./index.css";

// Register default views
registerViews([
  {
    id: "home",
    label: "Home",
    position: "nav",
    component: HomeScreen,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider initial="dark">
      <AppShell />
    </ThemeProvider>
  </StrictMode>,
);
