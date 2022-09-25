import { Box, Stack } from "@mantine/core";
import { IconCaretDown } from "@tabler/icons";
import { FC } from "react";

export const PullDownContent: FC = () => {
  return (
    <Stack align="center" justify="center" spacing={4} sx={{ height: 60 }}>
      <IconCaretDown stroke={1.5} />
      <Box>Тягни щоб оновити</Box>
    </Stack>
  );
};
