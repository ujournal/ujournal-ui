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
  ThemeIcon,
} from "@mantine/core";
import {
  IconAt,
  IconBallon,
  IconBell,
  IconMessageCircle2,
} from "@tabler/icons";
import { DateFormatted } from "baza/components/DeteFormatted";
import { capitalize } from "baza/utils/string";
import { useAuth } from "features/app/hooks/useAuth";
import Link from "next/link";
import { FC, MouseEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMarkAllAsRead } from "../hooks/useMakAllAsReat";
import { useMentionMarkAsRead } from "../hooks/useMentionMarkAsRead";
import { NotificationType, useNotifications } from "../hooks/useNotifications";
import { useReplyMarkAsRead } from "../hooks/useReplyMarkAsRead";
import { useDisclosure } from "@mantine/hooks";

enum View {
  Viewed = "viewed",
  Unread = "unread",
}

export const NotificationsMenu: FC = () => {
  const [view, setView] = useState<View>(View.Unread);
  const params = {
    limit: 20,
    unread_only: view === View.Unread,
  };
  const notifications = useNotifications(params);
  const replyMarkAsRead = useReplyMarkAsRead();
  const mentionMarkAsRead = useMentionMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const { t } = useTranslation();
  const auth = useAuth();
  const [opened, { close, open }] = useDisclosure(false);

  const handleNotificationClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      close();
      if (event.currentTarget.dataset.type === NotificationType.Reply) {
        replyMarkAsRead.mutateAsync(
          parseInt(event.currentTarget.dataset.commentReplyId as string, 10)
        );
      } else {
        mentionMarkAsRead.mutateAsync(
          parseInt(event.currentTarget.dataset.personMentionId as string, 10)
        );
      }
    },
    [close, mentionMarkAsRead, replyMarkAsRead]
  );

  const hadleMarkAllAsReak = useCallback(() => {
    markAllAsRead.mutateAsync();
  }, [markAllAsRead]);

  const handleViewChange = useCallback((view: View) => {
    setView(view);
  }, []);

  const handleClose = useCallback(() => {
    close();
    setView(View.Unread);
  }, [close]);

  if (!auth.loggedIn) {
    return null;
  }

  return (
    <Popover
      opened={opened}
      position="bottom"
      transition="pop"
      onClose={handleClose}
    >
      <Popover.Target>
        <Indicator
          offset={4}
          withBorder
          color="red"
          disabled={notifications.data.length === 0 || view === View.Viewed}
        >
          <ActionIcon radius="xl" variant="subtle" onClick={open}>
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
        {notifications.isLoading ||
        markAllAsRead.isLoading ||
        !notifications.data ? (
          <Box sx={{ width: 400 }} p="md">
            <Center>
              <Loader />
            </Center>
          </Box>
        ) : notifications.data.length > 0 ? (
          <Stack spacing={0}>
            <Stack sx={{ width: 400 }} spacing={0}>
              {notifications.data.map(({ type, reply, mention, published }) => (
                <Link
                  href={{
                    pathname: "/post",
                    query: {
                      postId: (reply || mention)?.post.id,
                      commentId: (reply || mention)?.comment.id,
                    },
                  }}
                  passHref
                  key={`${(reply || mention)?.post.id}_${
                    (reply || mention)?.comment.id
                  }`}
                >
                  <Box
                    component="a"
                    onClick={handleNotificationClick}
                    data-comment-reply-id={reply?.comment.id}
                    data-person-mention-id={mention?.person_mention.id}
                    data-type={type}
                  >
                    <Group
                      noWrap
                      sx={(theme) => ({
                        borderBottom: `1px solid ${
                          theme.colorScheme === "light"
                            ? theme.colors.gray[1]
                            : theme.colors.gray[8]
                        }`,
                      })}
                      p="sm"
                      align="flex-start"
                    >
                      <Stack spacing={4}>
                        <Group noWrap spacing="xs">
                          <Avatar
                            size={24}
                            radius="xl"
                            src={(reply || mention)?.creator.avatar.unwrapOr(
                              ""
                            )}
                          />
                          <Box component="a" sx={{ fontWeight: 500 }}>
                            {(reply || mention)?.creator.display_name.unwrapOr(
                              ""
                            ) || (reply || mention)?.creator.name}
                          </Box>
                          {published && (
                            <DateFormatted date={new Date(published + "Z")} />
                          )}
                        </Group>
                        <Group noWrap spacing="xs">
                          <Box
                            sx={{
                              minWidth: 24,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <ThemeIcon
                              variant="outline"
                              sx={{ border: "none" }}
                              color="gray"
                              size={16}
                            >
                              {type === NotificationType.Mention ? (
                                <IconAt stroke={1.5} />
                              ) : (
                                <IconMessageCircle2 stroke={1.5} />
                              )}
                            </ThemeIcon>
                          </Box>
                          <Box>{(reply || mention)?.post.name}</Box>
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
          <Box sx={{ width: 400 }} p="md">
            <Center>
              <IconBallon size={24} stroke={1.5} />
            </Center>
          </Box>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
