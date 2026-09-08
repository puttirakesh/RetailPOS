// src/lib/theme/muiTheme.js

import { createTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";
import spacing, { radius } from "./spacing";
import { shadows } from "./designTokens";

export const createMuiAppTheme = (mode = "light") => {
  const isDark = mode === "dark";

  const surface = isDark ? colors.dark : colors.light;

  return createTheme({
    palette: {
      mode,

      primary: {
        main: colors.primary[600],
        light: colors.primary[400],
        dark: colors.primary[800],
        contrastText: "#FFFFFF",
      },

      secondary: {
        main: colors.secondary[600],
        light: colors.secondary[400],
        dark: colors.secondary[800],
        contrastText: "#FFFFFF",
      },

      info: {
        main: colors.accent[600],
        light: colors.accent[400],
        dark: colors.accent[800],
        contrastText: "#FFFFFF",
      },

      success: {
        main: colors.success[600],
        light: colors.success[400],
        dark: colors.success[800],
        contrastText: "#FFFFFF",
      },

      warning: {
        main: colors.warning[500],
        light: colors.warning[400],
        dark: colors.warning[700],
        contrastText: "#0F172A",
      },

      error: {
        main: colors.danger[600],
        light: colors.danger[400],
        dark: colors.danger[800],
        contrastText: "#FFFFFF",
      },

      background: {
        default: surface.background,
        paper: surface.surface,
      },

      text: {
        primary: surface.text,
        secondary: surface.textMuted,
      },

      divider: surface.border,
    },

    typography: {
      fontFamily: typography.fontFamily.sans,

      h1: typography.h1,
      h2: typography.h2,
      h3: typography.h3,
      h4: typography.h4,

      body1: typography.body,
      body2: typography.bodySmall,

      button: {
        ...typography.button,
        textTransform: "none",
      },

      caption: typography.caption,
    },

    spacing: 4,

    shape: {
      borderRadius: 12,
    },

    shadows: [
      shadows.none,
      shadows.xs,
      shadows.sm,
      shadows.md,
      shadows.lg,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: surface.background,
            color: surface.text,
          },

          "*": {
            scrollbarWidth: "thin",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            minHeight: "42px",
            borderRadius: radius.md,
            paddingInline: spacing[4],
            fontWeight: 600,
            transition: "all 180ms ease",
          },

          containedPrimary: {
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          size: "small",
        },

        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              minHeight: "42px",
              borderRadius: radius.md,
            },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: surface.surface,

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary[400],
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: radius.xl,
            border: `1px solid ${surface.border}`,
            backgroundImage: "none",
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: radius.xl,
            backgroundImage: "none",
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: radius.sm,
            fontSize: "0.75rem",
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: radius.full,
            fontWeight: 600,
          },
        },
      },
    },
  });
};

export const lightMuiTheme = createMuiAppTheme("light");
export const darkMuiTheme = createMuiAppTheme("dark");

export default lightMuiTheme;