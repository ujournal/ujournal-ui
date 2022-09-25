import { Loader, Stack } from "@mantine/core";
import { FC } from "react";

export const RefreshContent: FC = () => {
  return (
    <Stack align="center" justify="center" sx={{ height: 60 }}>
      <Loader color="gray" size="xs" />
    </Stack>
  );
};
