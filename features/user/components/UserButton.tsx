import React from "react";
import { UnstyledButton, Group, Text, Avatar } from "@mantine/core";
import { IconUser } from "@tabler/icons";
import { FC } from "react";
import { forwardRef } from "react";
import { ForwardRefExoticComponent } from "react";
import { ForwardedRef } from "react";

type UserButtonProps = {
  image?: string;
  label: string;
};

export const UserButtonWithoutRef = (
  { image, label }: UserButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <UnstyledButton
      ref={ref}
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
    >
      <Group sx={{ flexWrap: "nowrap" }} spacing={"xs"}>
        <Avatar src={image} radius="lg" size="sm">
          <IconUser />
        </Avatar>

        <Text
          sx={{
            textOverflow: "ellipsis",
            minWidth: 0,
            width: "100%",
            maxWidth: 160,
            overflow: "hidden",
          }}
          weight={600}
        >
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  UserButtonWithoutRef
);
