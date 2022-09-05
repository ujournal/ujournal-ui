import React from "react";
import {
  UnstyledButton,
  Group,
  Text,
  Avatar,
  Tooltip,
  Box,
} from "@mantine/core";
import { IconSpeakerphone } from "@tabler/icons";

type CommunityButtonProps = {
  image?: string;
  label: string;
  weight?: number;
  active?: boolean;
};

export const CommunityButton = ({
  image,
  label,
  weight,
  active = false,
}: CommunityButtonProps) => {
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
      >
        <Box
          sx={(theme) => ({
            backgroundColor: active ? "white" : undefined,
            borderRadius: theme.radius.sm,
          })}
          p={6}
        >
          <Group sx={{ flexWrap: "nowrap", overflow: "hidden" }} spacing={"xs"}>
            <Avatar src={image} size="sm" radius="sm">
              <IconSpeakerphone stroke={1.5} />
            </Avatar>

            <Text
              size="md"
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
