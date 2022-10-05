import {
  UnstyledButton,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
  Box,
  Stack,
  Menu,
} from "@mantine/core";
import { IconChevronDown, TablerIcon } from "@tabler/icons";
import { partition } from "lodash";
import Link from "next/link";
import { useMemo } from "react";
import { FC, useCallback } from "react";
import { UrlObject } from "url";

export const LinksList: FC<{
  items: {
    label: string;
    url: string | UrlObject;
    icon: TablerIcon;
    active?: boolean;
    parent?: string;
  }[];
  onLinkClick?: () => void;
}> = ({ items, onLinkClick }) => {
  const handleButtonClick = useCallback(() => {
    if (onLinkClick) {
      onLinkClick();
    }
  }, [onLinkClick]);

  const itemsForRender = useMemo(() => {
    const itemsPartitioned = partition(items, (item) => item.parent);
    const itemsRoot = itemsPartitioned.find((group) => !group[0].parent) || [];

    return itemsRoot.map((item) => {
      let itemsGrouped =
        itemsPartitioned.find((group) => group[0].parent === item.label) || [];

      const itemGroupedActive = itemsGrouped.find((item) => item.active);

      if (itemGroupedActive) {
        itemsGrouped = [
          ...itemsGrouped.filter(
            (item) => item.label !== itemGroupedActive.label
          ),
          item,
        ];
      }

      return {
        item: itemGroupedActive || item,
        itemsGrouped,
      };
    });
  }, [items]);

  return (
    <Stack spacing={0}>
      {itemsForRender.map(({ item, itemsGrouped }) => {
        const { url, label, icon: Icon, active } = item;

        return (
          <Group noWrap spacing={2} key={label}>
            <Tooltip label={label} openDelay={1000}>
              <Box sx={{ flex: "1 1 0" }}>
                <Link href={url} passHref>
                  <UnstyledButton
                    px={6}
                    py={4}
                    pr={itemsGrouped.length > 0 ? 0 : undefined}
                    sx={{
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                    component="a"
                    onClick={handleButtonClick}
                  >
                    <Box
                      sx={(theme) => ({
                        backgroundColor: active
                          ? theme.colorScheme === "light"
                            ? theme.white
                            : theme.colors.gray[9]
                          : undefined,
                        borderRadius: theme.radius.md,
                        borderTopRightRadius:
                          itemsGrouped.length > 0 ? theme.radius.xs : undefined,
                        borderBottomRightRadius:
                          itemsGrouped.length > 0 ? theme.radius.xs : undefined,
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
            {itemsGrouped.length > 0 && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton
                    px={6}
                    py={4}
                    pl={itemsGrouped.length > 0 ? 0 : undefined}
                    sx={{
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                    component="a"
                  >
                    <Box
                      sx={(theme) => ({
                        backgroundColor: active
                          ? theme.colorScheme === "light"
                            ? theme.white
                            : theme.colors.gray[9]
                          : undefined,
                        borderRadius: theme.radius.md,
                        borderTopLeftRadius:
                          itemsGrouped.length > 0 ? theme.radius.xs : undefined,
                        borderBottomLeftRadius:
                          itemsGrouped.length > 0 ? theme.radius.xs : undefined,
                        height: 42,
                        display: "flex",
                        alignItems: "center",
                      })}
                      px={6}
                    >
                      <IconChevronDown stroke={1.5} />
                    </Box>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  {itemsGrouped.map(({ url, label, icon: Icon }) => (
                    <Link href={url} passHref key={label}>
                      <Menu.Item
                        component="a"
                        icon={<Icon stroke={1.5} />}
                        onClick={handleButtonClick}
                      >
                        {label}
                      </Menu.Item>
                    </Link>
                  ))}
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        );
      })}
    </Stack>
  );
};
