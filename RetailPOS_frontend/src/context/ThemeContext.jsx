// src/context/ThemeContext.jsx

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  import {
    createMuiAppTheme,
  } from "../lib/theme/muiTheme";
  
  const ThemeContext = createContext(null);
  
  export function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
      return localStorage.getItem("retailpos-theme") || "light";
    });
  
    const theme = useMemo(() => {
      return createMuiAppTheme(mode);
    }, [mode]);
  
    useEffect(() => {
      localStorage.setItem("retailpos-theme", mode);
  
      document.documentElement.setAttribute(
        "data-theme",
        mode,
      );
  
      document.documentElement.style.colorScheme = mode;
    }, [mode]);
  
    const toggleTheme = () => {
      setMode((current) =>
        current === "light" ? "dark" : "light",
      );
    };
  
    const value = {
      mode,
      theme,
      setMode,
      toggleTheme,
    };
  
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  export function useTheme() {
    const context = useContext(ThemeContext);
  
    if (!context) {
      throw new Error(
        "useTheme must be used inside ThemeProvider",
      );
    }
  
    return context;
  }