import { Box, Text } from "@mantine/core";
import { FC, ReactNode } from "react";

export const NavbarTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box px={10} pb={4}>
      <Text
        sx={(theme) => ({
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: 12,
          color: theme.colors.gray[6],
        })}
      >
        {children}
      </Text>
    </Box>
  );
};
