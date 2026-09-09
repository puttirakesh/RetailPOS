import {
  createTheme,
} from "@mui/material/styles";

import colors from "./colors";
import typography from "./typography";

export function createMuiTheme(mode = "light") {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: {
        main: colors.primary[500],
        light: colors.primary[400],
        dark: colors.primary[700],
        contrastText: "#ffffff",
      },

      secondary: {
        main: colors.cyan[500],
        light: colors.cyan[400],
        dark: colors.cyan[700],
        contrastText: "#ffffff",
      },

      success: {
        main: colors.success[500],
        dark: colors.success[700],
      },

      warning: {
        main: colors.warning[500],
        dark: colors.warning[700],
      },

      error: {
        main: colors.error[500],
        dark: colors.error[700],
      },

      info: {
        main: colors.info[500],
        dark: colors.info[700],
      },

      background: {
        default: dark
          ? colors.dark.background
          : colors.light.background,

        paper: dark
          ? colors.dark.surface
          : colors.light.surface,
      },

      text: {
        primary: dark
          ? colors.dark.text
          : colors.light.text,

        secondary: dark
          ? colors.dark.textMuted
          : colors.light.textMuted,
      },

      divider: dark
        ? colors.dark.border
        : colors.light.border,
    },

    typography: {
      fontFamily:
        typography.fontFamily.sans,

      h1: {
        fontSize: "1.875rem",
        fontWeight: 700,
        letterSpacing: "-0.025em",
      },

      h2: {
        fontSize: "1.5rem",
        fontWeight: 700,
      },

      h3: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },

      body1: {
        fontSize: "0.875rem",
      },

      body2: {
        fontSize: "0.8125rem",
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            borderRadius: 10,
            minHeight: 40,
            paddingLeft: 16,
            paddingRight: 16,
            textTransform: "none",
            fontWeight: 600,
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
              borderRadius: 10,

              "&:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor:
                    colors.primary[400],
                },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderWidth: 1.5,
                },
            },
          },
        },
      },

      MuiSelect: {
        defaultProps: {
          size: "small",
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${
              dark
                ? colors.dark.border
                : colors.light.border
            }`,
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.15)",
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: "0.75rem",
            padding: "8px 10px",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: dark
              ? colors.dark.border
              : colors.light.border,
          },

          head: {
            fontWeight: 600,
          },
        },
      },
    },
  });
}

export default createMuiTheme;