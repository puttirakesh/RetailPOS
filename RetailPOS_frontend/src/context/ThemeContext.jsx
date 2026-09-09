import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import createMuiTheme from "../lib/theme/muiTheme";

const ThemeContext =
  createContext(null);

export function ThemeProvider({
  children,
}) {
  const [
    mode,
    setMode,
  ] = useState(() => {
    return (
      localStorage.getItem(
        "retailpos-theme"
      ) || "light"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "retailpos-theme",
      mode
    );

    document.documentElement.setAttribute(
      "data-theme",
      mode
    );

    document.documentElement.classList.toggle(
      "dark",
      mode === "dark"
    );
  }, [mode]);

  const muiTheme =
    useMemo(
      () =>
        createMuiTheme(mode),
      [mode]
    );

  const toggleTheme = () => {
    setMode((current) =>
      current === "light"
        ? "dark"
        : "light"
    );
  };

  const value = {
    mode,
    setMode,
    toggleTheme,
    isDark: mode === "dark",
  };

  return (
    <ThemeContext.Provider
      value={value}
    >
      <MuiThemeProvider
        theme={muiTheme}
      >
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(
      ThemeContext
    );

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}