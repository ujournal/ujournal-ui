import { MantineTheme } from "@mantine/core";

export const mantineTheme: Partial<MantineTheme> = {
  fontFamily: "Roboto, sans-serif",
  primaryShade: 6,
  loader: "dots",
  black: "#333",
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  lineHeight: 1.5,
  headings: {
    fontFamily: "eUkraineRegular, sans-serif",
    fontWeight: 500,
    sizes: {
      h1: {
        fontSize: 26,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h2: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h3: {
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h4: {
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.5,
      },
    },
  },
};
