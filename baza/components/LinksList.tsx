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
import { useRouter } from "next/router";
import { FC, SyntheticEvent, useCallback } from "react";
import { UrlObject } from "url";

export const LinksList: FC<{
  items: {
    label: string;
    url: string | UrlObject;
    icon: TablerIcon;
    active?: boolean;
  }[];
  onLinkClick?: () => void;
}> = ({ items, onLinkClick }) => {
  const router = useRouter();

  const handleButtonClick = useCallback(
    (event: SyntheticEvent<HTMLAnchorElement>) => {
      // router.push(JSON.parse(event.currentTarget.dataset.url as string));

      if (onLinkClick) {
        onLinkClick();
      }
    },
    [onLinkClick]
  );

  return (
    <Stack spacing={0}>
      {items.map(({ url, label, icon: Icon, active }) => (
        <Tooltip label={label} openDelay={1000} key={JSON.stringify(url)}>
          <Box>
            <Link href={url} passHref>
              <UnstyledButton
                px={6}
                py={4}
                sx={{
                  display: "block",
                  whiteSpace: "nowrap",
                }}
                component="a"
                onClick={handleButtonClick}
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
            </Link>
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
};
