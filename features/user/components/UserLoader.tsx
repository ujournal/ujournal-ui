import { Group, Skeleton } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { random } from "lodash";
import { FC } from "react";

export const UserLoader: FC<{
  useRandomWidth?: boolean;
  nameWidth?: number;
  padding?: string | number;
  opacity?: number;
}> = ({ useRandomWidth = true, nameWidth = 100, padding = "sm", opacity }) => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });

  return (
    <Group
      spacing="xs"
      noWrap
      p={padding}
      sx={{
        width: largerThanSm
          ? useRandomWidth
            ? random(100, 200)
            : nameWidth
          : undefined,
      }}
    >
      <Skeleton
        width={26}
        height={26}
        circle
        radius={26}
        sx={{ minWidth: 26, opacity }}
      />
      {largerThanSm && <Skeleton height={10} radius="sm" sx={{ opacity }} />}
    </Group>
  );
};
