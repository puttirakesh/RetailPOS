// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

import { SidebarProvider } from "./context/SidebarContext";

import { useTheme } from "./context/ThemeContext";

import "./styles/index.css";

function AppProviders() {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />

      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </MuiThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProviders />
    </ThemeProvider>
  </React.StrictMode>,
);
