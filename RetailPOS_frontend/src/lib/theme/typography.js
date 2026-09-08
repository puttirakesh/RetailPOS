// src/lib/theme/typography.js

export const fontFamily = {
    sans: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(", "),
  
    mono: [
      '"JetBrains Mono"',
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      "monospace",
    ].join(", "),
  };
  
  export const typography = {
    fontFamily,
  
    display: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
  
    h1: {
      fontSize: "2rem",
      lineHeight: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
  
    h2: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
  
    h3: {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
      fontWeight: 650,
    },
  
    h4: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
      fontWeight: 600,
    },
  
    body: {
      fontSize: "0.9375rem",
      lineHeight: "1.5rem",
      fontWeight: 400,
    },
  
    bodySmall: {
      fontSize: "0.8125rem",
      lineHeight: "1.25rem",
      fontWeight: 400,
    },
  
    label: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
  
    caption: {
      fontSize: "0.6875rem",
      lineHeight: "1rem",
      fontWeight: 500,
    },
  
    button: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      fontWeight: 600,
    },
  };
  
  export default typography;