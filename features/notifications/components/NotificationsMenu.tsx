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
  Tabs,
} from "@mantine/core";
import { IconBallon, IconBell } from "@tabler/icons";
import { capitalize } from "baza/utils/string";
import { useAuth } from "features/app/hooks/useAuth";
import Link from "next/link";
import { FC, MouseEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMarkAllAsRead } from "../hooks/useMakAllAsReat";
import { useReplies } from "../hooks/useReplies";
import { useReplyMarkAsRead } from "../hooks/useReplyMarkAsRead";

enum View {
  Viewed = "viewed",
  Unread = "unread",
}

export const NotificationsMenu: FC = () => {
  const [view, setView] = useState<View>(View.Unread);
  const replies = useReplies({ limit: 20, unread_only: view === View.Unread });
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

  const handleViewChange = useCallback((view: View) => {
    setView(view);
  }, []);

  const handleClose = useCallback(() => {
    setView(View.Unread);
  }, []);

  if (!auth.loggedIn) {
    return null;
  }

  return (
    <Popover position="bottom" transition="pop" onClose={handleClose}>
      <Popover.Target>
        <Indicator
          offset={4}
          withBorder
          color="red"
          disabled={
            !replies.data ||
            replies.data.replies.length === 0 ||
            view === View.Viewed
          }
        >
          <ActionIcon radius="xl" variant="subtle">
            <IconBell stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown p={0} sx={{ maxHeight: "60vh", overflow: "auto" }}>
        <Tabs defaultValue={View.Unread} onTabChange={handleViewChange}>
          <Tabs.List position="center">
            <Tabs.Tab value={View.Unread}>{capitalize(t("unread"))}</Tabs.Tab>
            <Tabs.Tab value={View.Viewed}>{capitalize(t("viewed"))}</Tabs.Tab>
          </Tabs.List>
        </Tabs>
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
            {view === View.Unread && (
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
            )}
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
