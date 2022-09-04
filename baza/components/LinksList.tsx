import { UnstyledButton, Group, Text, ThemeIcon } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { FC } from "react";

export const LinksList: FC<{
  items: { label: string; url: string; icon: TablerIcon }[];
}> = ({ items }) => {
  return (
    <>
      {items.map(({ url, label, icon: Icon }) => (
        <UnstyledButton
          key={url}
          sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
            whiteSpace: "nowrap",
          })}
          title={label}
        >
          <Group sx={{ flexWrap: "nowrap", overflow: "hidden" }} spacing={"xs"}>
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
        </UnstyledButton>
      ))}
    </>
  );
};
