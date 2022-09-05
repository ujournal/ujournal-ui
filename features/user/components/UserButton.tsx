import React from "react";
import {
  UnstyledButton,
  Group,
  Text,
  Avatar,
  Tooltip,
  Box,
} from "@mantine/core";
import { IconUser } from "@tabler/icons";
import { forwardRef } from "react";
import { ForwardedRef } from "react";

type UserButtonProps = {
  image?: string;
  label: string;
  weight?: number;
  active?: boolean;
};

export const UserButtonWithoutRef = (
  { image, label, weight, active = false }: UserButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <Tooltip label={label} openDelay={1000}>
      <UnstyledButton
        p={6}
        sx={(theme) => ({
          display: "block",
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          whiteSpace: "nowrap",
        })}
        ref={ref}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: active ? "white" : undefined,
            borderRadius: theme.radius.sm,
          })}
          p={6}
        >
          <Group sx={{ flexWrap: "nowrap" }} spacing={"xs"}>
            <Avatar src={image} radius="lg" size="sm">
              <IconUser stroke={1.5} />
            </Avatar>

            <Text
              sx={{
                textOverflow: "ellipsis",
                minWidth: 0,
                width: "100%",
                maxWidth: 160,
                overflow: "hidden",
              }}
              weight={weight}
            >
              {label}
            </Text>
          </Group>
        </Box>
      </UnstyledButton>
    </Tooltip>
  );
};

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  UserButtonWithoutRef
);
