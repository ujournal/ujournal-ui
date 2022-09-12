import { Box, BoxProps, useMantineTheme } from "@mantine/core";
import { FC, useMemo } from "react";

export const Score: FC<{ score: number } & BoxProps> = ({
  score,
  ...props
}) => {
  const theme = useMantineTheme();

  const sx = useMemo(() => {
    const color = {
      color:
        score > 0
          ? theme.colors.green
          : score < 0
          ? theme.colors.red
          : theme.colors.gray,
    };

    const other = props.sx instanceof Function ? props.sx(theme) : props.sx;

    return {
      ...other,
      ...color,
    };
  }, [props, score, theme]);

  return (
    <Box {...props} sx={sx}>
      {score}
    </Box>
  );
};
