import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";

import "./styles/index.css";

function AppProviders() {
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />

      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AppProviders />
  </React.StrictMode>
);