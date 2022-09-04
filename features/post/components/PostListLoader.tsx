import { Box, Card, Group, Skeleton, Stack } from "@mantine/core";
import { random } from "lodash";
import { FC } from "react";

export const PostListLoader: FC = () => {
  return (
    <Stack spacing="lg">
      {Array.from(Array(5).keys()).map((key) => (
        <Card p="lg" radius="md" key={key}>
          <Stack>
            <Group noWrap mx="-xs" mt="-xs">
              <Group
                spacing="xs"
                noWrap
                p="xs"
                sx={{ width: random(100, 200) }}
              >
                <Skeleton
                  width={26}
                  height={26}
                  radius="sm"
                  sx={{ minWidth: 26 }}
                />
                <Skeleton height={10} radius="sm" />
              </Group>
              <Group
                spacing="xs"
                noWrap
                p="xs"
                sx={{ width: random(100, 200) }}
              >
                <Skeleton
                  width={26}
                  height={26}
                  circle
                  radius={26}
                  sx={{ minWidth: 26 }}
                />
                <Skeleton height={10} radius="sm" />
              </Group>
            </Group>
            <Stack spacing="xs">
              <Skeleton height={16} radius="sm" />
              <Skeleton height={16} radius="sm" width={`${random(10, 80)}%`} />
            </Stack>
            <Box mx="-lg">
              <Skeleton height={random(100, 400)} radius={0} />
            </Box>
            <Group noWrap position="apart">
              <Skeleton width={160} height={32} radius="sm" />
              <Group spacing="xs" noWrap>
                <Skeleton width={32} height={32} radius="sm" />
                <Skeleton height={16} circle />
                <Skeleton width={32} height={32} radius="sm" />
              </Group>
            </Group>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
