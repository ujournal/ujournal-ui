import { Group, Skeleton } from "@mantine/core";
import { random } from "lodash";
import { FC } from "react";

export const UserLoader: FC<{
  useRandomWidth?: boolean;
  nameWidth?: number;
  padding?: string | number;
  opacity?: number;
}> = ({ useRandomWidth = true, nameWidth = 100, padding = "xs", opacity }) => {
  return (
    <Group
      spacing="xs"
      noWrap
      p={padding}
      sx={{ width: useRandomWidth ? random(100, 200) : nameWidth }}
    >
      <Skeleton
        width={26}
        height={26}
        circle
        radius={26}
        sx={{ minWidth: 26, opacity }}
      />
      <Skeleton height={10} radius="sm" sx={{ opacity }} />
    </Group>
  );
};
