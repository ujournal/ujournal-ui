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
import Link from "next/link";
import { FC } from "react";
import { UrlObject } from "url";

export const LinksList: FC<{
  items: {
    label: string;
    url: string | UrlObject;
    icon: TablerIcon;
    active?: boolean;
  }[];
}> = ({ items }) => {
  return (
    <Stack spacing={0}>
      {items.map(({ url, label, icon: Icon, active }) => (
        <Link href={`${url}_${label}`} passHref key={url.toString()}>
          <Tooltip label={label} openDelay={1000}>
            <UnstyledButton
              px={6}
              py={4}
              sx={(theme) => ({
                display: "block",
                whiteSpace: "nowrap",
              })}
              component="a"
            >
              <Box
                sx={(theme) => ({
                  backgroundColor: active ? "white" : undefined,
                  borderRadius: theme.radius.md,
                })}
                px={6}
                py={8}
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
        </Link>
      ))}
    </Stack>
  );
};
