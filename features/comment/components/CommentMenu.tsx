import { Menu, ActionIcon } from "@mantine/core";
import { IconDots, IconEdit, IconLink, IconTrash } from "@tabler/icons";
import { t } from "i18next";
import { capitalize } from "lodash";
import { FC } from "react";

export const CommentMenu: FC<{
  onEdit?: () => void;
  onDelete?: () => void;
  onCopyLink?: () => void;
}> = ({ onEdit, onDelete, onCopyLink }) => {
  return (
    <Menu withinPortal position="right-end" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {onEdit && (
          <Menu.Item icon={<IconEdit size={14} />} onClick={onEdit}>
            {capitalize(t("edit"))}
          </Menu.Item>
        )}
        {onDelete && (
          <Menu.Item
            icon={<IconTrash size={14} />}
            color="red"
            onClick={onDelete}
          >
            {capitalize(t("delete"))}
          </Menu.Item>
        )}
        {onCopyLink && (
          <Menu.Item icon={<IconLink size={14} />} onClick={onCopyLink}>
            {capitalize(t("link"))}
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
