import colors from "./colors";
import typography from "./typography";
import spacing, {
  layout,
} from "./spacing";

export const designTokens = {
  colors,
  typography,
  spacing,
  layout,

  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.75rem",
    full: "9999px",
  },

  shadows: {
    none: "none",

    sm: "0 1px 2px rgba(15, 23, 42, 0.04)",

    md: [
      "0 4px 12px rgba(15, 23, 42, 0.06)",
      "0 2px 4px rgba(15, 23, 42, 0.03)",
    ].join(", "),

    lg: [
      "0 12px 30px rgba(15, 23, 42, 0.08)",
      "0 4px 10px rgba(15, 23, 42, 0.04)",
    ].join(", "),

    xl: "0 20px 50px rgba(15, 23, 42, 0.12)",
  },

  transition: {
    fast: "150ms ease",
    normal: "200ms ease",
    medium: "250ms ease",
    slow: "350ms ease",
  },

  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1100,
    topbar: 1200,
    mobileDrawer: 1300,
    modal: 2000,
    toast: 3000,
    tooltip: 4000,
  },
};

export default designTokens;