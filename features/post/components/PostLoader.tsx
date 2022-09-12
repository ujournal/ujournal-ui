import { FC } from "react";
import { Box, Card, Container, Group, Skeleton, Stack } from "@mantine/core";
import { UserLoader } from "features/user/components/UserLoader";
import { random } from "lodash";
import { useBreakpoint } from "baza/hooks/useBreakpoint";

export const PostLoader: FC = () => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  return (
    <Card
      p={smallerThanSm ? "xs" : "lg"}
      radius={smallerThanSm ? undefined : "md"}
    >
      <Stack spacing={smallerThanSm ? "sm" : "md"}>
        <Container size={650} p={0} sx={{ width: "100%" }}>
          <Group noWrap mx="-xs" mt="-xs" sx={{ width: "100%" }}>
            <Group spacing="xs" noWrap p="xs" sx={{ width: random(100, 200) }}>
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
        </Container>

        <Stack spacing="xs">
          <Skeleton height={16} radius="sm" />
          <Skeleton height={16} radius="sm" width={`${random(10, 80)}%`} />
        </Stack>

        <Box mx="-lg">
          <Skeleton height={random(100, 400)} radius={0} />
        </Box>

        <Container size={650} p={0} sx={{ width: "100%" }}>
          <Group noWrap position="apart" sx={{ width: "100%" }}>
            <Skeleton width={120} height={16} radius="sm" />
            <Group spacing={2} noWrap>
              <Skeleton width={28} height={28} radius="sm" />
              <Skeleton width={40} height={28} radius="sm" />
              <Skeleton width={28} height={28} radius="sm" />
            </Group>
          </Group>
        </Container>
      </Stack>
    </Card>
  );
};
