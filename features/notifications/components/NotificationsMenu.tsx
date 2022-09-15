import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Group,
  Indicator,
  Loader,
  Popover,
  Stack,
} from "@mantine/core";
import { IconBallon, IconBell, IconFileDots } from "@tabler/icons";
import { capitalize } from "baza/utils/string";
import { useAuth } from "features/app/hooks/useAuth";
import { t } from "i18next";
import Link from "next/link";
import { FC, MouseEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMarkAllAsRead } from "../hooks/useMakAllAsReat";
import { useReplies } from "../hooks/useReplies";
import { useReplyMarkAsRead } from "../hooks/useReplyMarkAsRead";

export const NotificationsMenu: FC = () => {
  const replies = useReplies({ limit: 10 });
  const replyMarkAsRead = useReplyMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const { t } = useTranslation();
  const auth = useAuth();

  const handleReplyClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      replyMarkAsRead.mutateAsync(
        parseInt(event.currentTarget.dataset.commentReplyId as string, 10)
      );
    },
    [replyMarkAsRead]
  );

  const hadleMarkAllAsReak = useCallback(() => {
    markAllAsRead.mutateAsync();
  }, [markAllAsRead]);

  if (!auth.loggedIn) {
    return null;
  }

  return (
    <Popover position="bottom" transition="pop">
      <Popover.Target>
        <Indicator
          offset={4}
          withBorder
          color="red"
          disabled={!replies.data || replies.data.replies.length === 0}
        >
          <ActionIcon radius="xl" variant="subtle">
            <IconBell stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown p={0} sx={{ maxHeight: "60vh", overflow: "scroll" }}>
        {replies.isLoading || markAllAsRead.isLoading || !replies.data ? (
          <Box sx={{ width: 300 }} p="md">
            <Center>
              <Loader />
            </Center>
          </Box>
        ) : replies.data.replies.length > 0 ? (
          <Stack spacing={0}>
            <Stack sx={{ width: 300 }} spacing={0}>
              {replies.data?.replies.map(({ creator, post, comment }) => (
                <Link
                  href={{
                    pathname: "/post",
                    query: { postId: post.id, commentId: comment.id },
                  }}
                  passHref
                  key={`${post.id}_${comment.id}`}
                >
                  <Box
                    component="a"
                    onClick={handleReplyClick}
                    data-comment-reply-id={comment.id}
                  >
                    <Group
                      noWrap
                      sx={(theme) => ({
                        borderBottom: `1px solid ${theme.colors.gray[1]}`,
                      })}
                      p="sm"
                      align="flex-start"
                    >
                      <Stack spacing={4}>
                        <Group noWrap spacing="xs">
                          <Avatar
                            size={24}
                            radius="xl"
                            src={creator.avatar.unwrapOr("")}
                          />
                          <Link
                            href={{
                              pathname: "/user",
                              query: { userId: creator.id },
                            }}
                            passHref
                          >
                            <Box component="a" sx={{ fontWeight: 500 }}>
                              {creator.display_name.unwrapOr("") ||
                                creator.name}
                            </Box>
                          </Link>
                        </Group>
                        <Group noWrap spacing="xs">
                          <Box sx={{ minWidth: 24 }} />
                          <Box>{post.name}</Box>
                        </Group>
                      </Stack>
                    </Group>
                  </Box>
                </Link>
              ))}
            </Stack>
            <Box p="xs">
              <Button
                size="sm"
                fullWidth
                variant="light"
                onClick={hadleMarkAllAsReak}
              >
                {capitalize(t("mark_all_as_read"))}
              </Button>
            </Box>
          </Stack>
        ) : (
          <Box sx={{ width: 300 }} p="md">
            <Center>
              <IconBallon size={24} stroke={1.5} />
            </Center>
          </Box>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
