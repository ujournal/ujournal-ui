import React, { useCallback } from "react";
import {
  UnstyledButton,
  Group,
  Text,
  Avatar,
  Tooltip,
  Box,
} from "@mantine/core";
import { IconSpeakerphone } from "@tabler/icons";
import Link from "next/link";

export type CommunityButtonProps = {
  communityName?: string;
  image?: string;
  label: string;
  weight?: number;
  active?: boolean;
  onLinkClick?: () => void;
};

export const CommunityButton = ({
  communityName,
  image,
  label,
  weight,
  active = false,
  onLinkClick,
}: CommunityButtonProps) => {
  const handleButtonClick = useCallback(() => {
    if (onLinkClick) {
      onLinkClick();
    }
  }, [onLinkClick]);

  return (
    <Tooltip label={label} openDelay={1000}>
      <Box component="span" onClick={handleButtonClick}>
        <Link
          href={{
            pathname: "/community",
            query: { communityName },
          }}
          passHref
        >
          <UnstyledButton
            component="a"
            px={6}
            py={4}
            sx={(theme) => ({
              display: "block",
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
              whiteSpace: "nowrap",
            })}
          >
            <Box
              sx={(theme) => ({
                backgroundColor: active ? "white" : undefined,
                borderRadius: theme.radius.sm,
              })}
              px={6}
              py={8}
            >
              <Group
                sx={{ flexWrap: "nowrap", overflow: "hidden" }}
                spacing={"xs"}
              >
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
        </Link>
      </Box>
    </Tooltip>
  );
};
