import { FC, useCallback } from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { capitalize } from "baza/utils/string";
import {
  IconDots,
  IconTrash,
  IconStar,
  IconStarOff,
  IconCopy,
  IconLock,
  IconPin,
  IconEdit,
  IconLink,
} from "@tabler/icons";
import Link from "next/link";
import { Post } from "ujournal-lemmy-js-client";
import { useTranslation } from "react-i18next";
import { useSiteUser } from "features/app/hooks/useSiteUser";
import { showNotification } from "@mantine/notifications";
import { useClipboard } from "@mantine/hooks";

export const PostMenu: FC<{ post: Post; saved: boolean }> = ({
  post,
  saved,
}) => {
  const { t } = useTranslation();
  const { localUserView } = useSiteUser();
  const clipboard = useClipboard({ timeout: 500 });

  const handleCopyLink = useCallback(() => {
    clipboard.copy(
      `${location.protocol}//${location.host}/${process.env.NEXT_PUBLIC_BASE_URL}post/?postId=${post.id}`
    );
    showNotification({
      message: "Copied!",
    });
  }, [clipboard, post.id]);

  return (
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={saved ? <IconStarOff size={14} /> : <IconStar size={14} />}
          sx={{ display: "none" }}
        >
          {saved ? capitalize(t("unsave")) : capitalize(t("save"))}
        </Menu.Item>
        <Menu.Item icon={<IconCopy size={14} />} sx={{ display: "none" }}>
          {capitalize(t("cross_post"))}
        </Menu.Item>
        {localUserView?.local_user.person_id === post.creator_id && (
          <Link href={`/edit-post?postId=${post.id}`}>
            <Menu.Item icon={<IconEdit size={14} />} component="a">
              {capitalize(t("edit"))}
            </Menu.Item>
          </Link>
        )}
        <Menu.Item icon={<IconLock size={14} />} sx={{ display: "none" }}>
          {post.locked ? capitalize(t("unlock")) : capitalize(t("lock"))}
        </Menu.Item>
        <Menu.Item icon={<IconPin size={14} />} sx={{ display: "none" }}>
          {post.stickied ? capitalize(t("unsticky")) : capitalize(t("sticky"))}
        </Menu.Item>
        {localUserView?.local_user.person_id === post.creator_id && (
          <Menu.Item
            icon={<IconTrash size={14} />}
            color="red"
            sx={{ display: "none" }}
          >
            {post.deleted ? capitalize(t("restore")) : capitalize(t("delete"))}
          </Menu.Item>
        )}
        <Menu.Item
          icon={<IconTrash size={14} />}
          color="red"
          sx={{ display: "none" }}
        >
          {post.removed ? capitalize(t("restore")) : capitalize(t("remove"))} (
          {t("mod")})
        </Menu.Item>
        <Menu.Item icon={<IconLink size={14} />} onClick={handleCopyLink}>
          {capitalize(t("link"))}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
