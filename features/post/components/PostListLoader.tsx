import { Box, Card, Group, Skeleton, Stack } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { UserLoader } from "features/user/components/UserLoader";
import { random } from "lodash";
import { FC } from "react";

export const PostListLoader: FC = () => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  return (
    <>
      {Array.from(Array(5).keys()).map((key) => (
        <Card
          p={smallerThanSm ? "xs" : "lg"}
          radius={smallerThanSm ? undefined : "md"}
          key={key}
        >
          <Stack spacing={smallerThanSm ? "sm" : "md"}>
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
              <UserLoader />
            </Group>
            <Stack spacing="xs">
              <Skeleton height={16} radius="sm" />
              <Skeleton height={16} radius="sm" width={`${random(10, 80)}%`} />
            </Stack>
            <Box mx="-lg">
              <Skeleton height={random(100, 400)} radius={0} />
            </Box>
            <Group noWrap position="apart">
              <Skeleton width={120} height={16} radius="sm" />
              <Group spacing="xs" noWrap>
                <Skeleton width={24} height={24} radius="sm" />
                <Skeleton height={16} circle />
                <Skeleton width={24} height={24} radius="sm" />
              </Group>
            </Group>
          </Stack>
        </Card>
      ))}
    </>
  );
};
