import { Card, Grid, Group, Skeleton, Stack } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { FC } from "react";

export const CommunityListGridLoader: FC = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  return (
    <>
      {Array(18)
        .fill(0)
        .map((_, index) => (
          <Grid.Col
            span={largerThanSm ? (largerThanMd ? 4 : 6) : 12}
            key={index}
          >
            <Card>
              <Card.Section>
                <Skeleton height={160} radius={0} />
              </Card.Section>
              <Stack mt="md">
                <Group noWrap>
                  <Skeleton width={60} height={60} sx={{ minWidth: 60 }} />
                  <Skeleton height={20} width={100} />
                </Group>
                <Skeleton height={34} />
              </Stack>
            </Card>
          </Grid.Col>
        ))}
    </>
  );
};
