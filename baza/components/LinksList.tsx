import {
  UnstyledButton,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
  Box,
  Stack,
} from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { FC } from "react";

export const LinksList: FC<{
  items: { label: string; url: string; icon: TablerIcon; active?: boolean }[];
}> = ({ items }) => {
  return (
    <Stack spacing={0}>
      {items.map(({ url, label, icon: Icon, active }) => (
        <Tooltip label={label} key={url} openDelay={1000}>
          <UnstyledButton
            p={6}
            sx={(theme) => ({
              display: "block",
              whiteSpace: "nowrap",
            })}
          >
            <Box
              sx={(theme) => ({
                backgroundColor: active ? "white" : undefined,
                borderRadius: theme.radius.sm,
              })}
              p={6}
            >
              <Group
                sx={{
                  flexWrap: "nowrap",
                  overflow: "hidden",
                }}
                spacing={"xs"}
              >
                <ThemeIcon
                  size="md"
                  radius="sm"
                  variant="outline"
                  color="gray"
                  sx={{ border: "none" }}
                >
                  <Icon stroke={1.5} />
                </ThemeIcon>

                <Text
                  size="md"
                  sx={{
                    textOverflow: "ellipsis",
                    minWidth: 0,
                    width: "100%",
                    maxWidth: 160,
                    overflow: "hidden",
                  }}
                >
                  {label}
                </Text>
              </Group>
            </Box>
          </UnstyledButton>
        </Tooltip>
      ))}
    </Stack>
  );
};
