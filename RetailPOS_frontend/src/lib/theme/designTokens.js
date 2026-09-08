// src/lib/theme/designTokens.js

import colors from "./colors";
import typography from "./typography";
import spacing, { radius, sizes } from "./spacing";

export const shadows = {
  none: "none",

  xs: "0 1px 2px rgb(15 23 42 / 0.04)",

  sm: [
    "0 1px 3px rgb(15 23 42 / 0.06)",
    "0 1px 2px rgb(15 23 42 / 0.04)",
  ].join(", "),

  md: [
    "0 4px 12px rgb(15 23 42 / 0.08)",
    "0 2px 4px rgb(15 23 42 / 0.04)",
  ].join(", "),

  lg: [
    "0 12px 30px rgb(15 23 42 / 0.10)",
    "0 4px 10px rgb(15 23 42 / 0.05)",
  ].join(", "),

  xl: "0 20px 50px rgb(15 23 42 / 0.14)",

  glowPrimary: "0 0 30px rgb(59 130 246 / 0.18)",

  glowAccent: "0 0 30px rgb(6 182 212 / 0.16)",
};

export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  normal: "220ms cubic-bezier(0.4, 0, 0.2, 1)",
  smooth: "300ms cubic-bezier(0.22, 1, 0.36, 1)",
  spring: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  sidebar: 1200,
  topbar: 1300,
  drawer: 1400,
  modal: 1500,
  toast: 1600,
};

export const breakpoints = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
};

const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  sizes,
  shadows,
  transitions,
  zIndex,
  breakpoints,
};

export default designTokens;