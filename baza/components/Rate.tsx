import { ActionIcon, Box, Group } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import { FC } from "react";

export const Rate: FC<{ count: number }> = ({ count = 0 }) => {
  return (
    <Group noWrap>
      <ActionIcon color="blue" variant="subtle">
        <IconArrowDown stroke={1.5} />
      </ActionIcon>
      <Box>{count}</Box>
      <ActionIcon color="blue" variant="subtle">
        <IconArrowUp stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};
