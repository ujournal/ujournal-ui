import { Group, Skeleton, Stack } from "@mantine/core";
import { random } from "lodash";
import { FC } from "react";

export const CommunityListLoader: FC = () => {
  return (
    <Stack spacing={0}>
      {Array.from(Array(20).keys()).map((key) => (
        <Group spacing="xs" key={key} noWrap p="xs">
          <Skeleton width={26} height={26} radius="sm" />
          <Skeleton height={10} radius="sm" width={`${random(20, 60)}%`} />
        </Group>
      ))}
    </Stack>
  );
};
