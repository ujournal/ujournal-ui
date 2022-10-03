import { MantineTheme } from "@mantine/core";

export const mantineTheme: Partial<MantineTheme> = {
  fontFamily:
    "eUkraineLight, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  primaryShade: 6,
  colorScheme: "light",
  loader: "dots",
  black: "#333",
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
  lineHeight: "156%",
  headings: {
    fontFamily:
      "eUkraineRegular, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    fontWeight: 300,
    sizes: {
      h1: {
        fontSize: `clamp(18px,1.82vw,26px)`,
        fontWeight: 200,
        lineHeight: "156%",
      },
      h2: {
        fontSize: `clamp(16px,1.42vw,20px)`,
        fontWeight: 200,
        lineHeight: "156%",
      },
      h3: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 200,
        lineHeight: "156%",
      },
      h4: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 200,
        lineHeight: "156%",
      },
      h5: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 200,
        lineHeight: "156%",
      },
      h6: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 200,
        lineHeight: "156%",
      },
    },
  },
};
