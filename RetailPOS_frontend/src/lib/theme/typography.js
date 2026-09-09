export const typography = {
  fontFamily: {
    sans: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "sans-serif",
    ].join(", "),

    mono: [
      "JetBrains Mono",
      "Fira Code",
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      "monospace",
    ].join(", "),
  },

  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  heading: {
    h1: {
      fontSize: "1.875rem",
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },

    h2: {
      fontSize: "1.5rem",
      lineHeight: 1.25,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },

    h3: {
      fontSize: "1.25rem",
      lineHeight: 1.3,
      fontWeight: 600,
    },

    h4: {
      fontSize: "1.125rem",
      lineHeight: 1.35,
      fontWeight: 600,
    },
  },

  body: {
    large: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },

    normal: {
      fontSize: "0.875rem",
      lineHeight: 1.55,
      fontWeight: 400,
    },

    small: {
      fontSize: "0.8125rem",
      lineHeight: 1.5,
      fontWeight: 400,
    },

    tiny: {
      fontSize: "0.6875rem",
      lineHeight: 1.4,
      fontWeight: 500,
    },
  },
};

export default typography;