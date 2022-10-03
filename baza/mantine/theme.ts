import { MantineTheme } from "@mantine/core";

export const mantineTheme: Partial<MantineTheme> = {
  fontFamily:
    "eUkraineLight, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  colorScheme: "light",
  fontSizes: {
    xs: 11,
    sm: 13,
    md: 16,
    lg: 18,
    xl: 20,
  },
  lineHeight: "156%",
  headings: {
    fontFamily:
      "eUkraineRegular, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    fontWeight: 300,
    sizes: {
      h1: {
        fontSize: `clamp(18px,1.82vw,26px)`,
        fontWeight: 300,
        lineHeight: "156%",
      },
      h2: {
        fontSize: `clamp(16px,1.42vw,20px)`,
        fontWeight: 300,
        lineHeight: "156%",
      },
      h3: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 300,
        lineHeight: "156%",
      },
      h4: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 300,
        lineHeight: "156%",
      },
      h5: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 300,
        lineHeight: "156%",
      },
      h6: {
        fontSize: `clamp(14px,1.26vw,18px)`,
        fontWeight: 300,
        lineHeight: "156%",
      },
    },
  },
};
