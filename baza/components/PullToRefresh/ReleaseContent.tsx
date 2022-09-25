import { Box, Stack } from "@mantine/core";
import { IconCaretUp } from "@tabler/icons";
import { FC } from "react";

export const ReleaseContent: FC = () => {
  return (
    <Stack align="center" justify="center" spacing={4} sx={{ height: 60 }}>
      <IconCaretUp stroke={1.5} />
      <Box>Відпусти щоб оновити</Box>
    </Stack>
  );
};
