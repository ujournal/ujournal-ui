import { MantineNumberSize, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type MediaQueryStylesParams = {
  smallerThan?: MantineNumberSize;
  largerThan?: MantineNumberSize;
};

export const useBreakpoint = ({
  largerThan,
  smallerThan,
}: MediaQueryStylesParams) => {
  const theme = useMantineTheme();

  let query = "";

  if (largerThan !== undefined && smallerThan !== undefined) {
    const minWidth =
      theme.fn.size({ size: largerThan, sizes: theme.breakpoints }) + 1;

    const maxWidth = theme.fn.size({
      size: smallerThan,
      sizes: theme.breakpoints,
    });

    query = `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
  } else {
    if (largerThan !== undefined) {
      query = `(min-width: ${
        theme.fn.size({ size: largerThan, sizes: theme.breakpoints }) + 1
      }px)`;
    }

    if (smallerThan !== undefined) {
      query = `(max-width: ${theme.fn.size({
        size: smallerThan,
        sizes: theme.breakpoints,
      })}px)`;
    }
  }

  return useMediaQuery(query);
};
