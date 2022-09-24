import { Stack, Box } from "@mantine/core";
import { IconCellSignalOff } from "@tabler/icons";
import { SitePage } from "types";

const OfflinePage: SitePage = () => {
  return (
    <Stack
      align="center"
      justify="center"
      spacing="sm"
      sx={{ height: "calc(100vh - 100px)" }}
    >
      <IconCellSignalOff stroke={1.5} />
      <Box>Немає інтернета.</Box>
    </Stack>
  );
};

export default OfflinePage;
