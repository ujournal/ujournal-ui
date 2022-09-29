import {
  Avatar,
  Box,
  Button,
  FileInput,
  Group,
  Input,
  Loader,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPhoto, IconUpload } from "@tabler/icons";
import { useImageUploaderFather } from "baza/hooks/useImageUploaderFather";
import { useUploader } from "baza/hooks/useUploader";
import { capitalize } from "baza/utils/string";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

export type Values = {
  show_nsfw: boolean;
  theme: string;
  default_sort_type: number;
  default_listing_type: number;
  lang: string;
  avatar: string;
  banner: string;
  display_name: string;
  email: string;
  bio: string;
  matrix_user_id: string;
  show_avatars: boolean;
  show_scores: boolean;
  send_notifications_to_email: boolean;
  bot_account: boolean;
  show_bot_accounts: boolean;
  show_read_posts: boolean;
  show_new_post_notifs: boolean;
};

export const ProfileForm: FC<{
  values?: Values;
  isLoading?: boolean;
  onSubmit: (values: Values) => void;
}> = ({
  values = {
    show_nsfw: false,
    theme: "",
    default_sort_type: 0,
    default_listing_type: 0,
    lang: "",
    avatar: "",
    banner: "",
    display_name: "",
    email: "",
    bio: "",
    matrix_user_id: "",
    show_avatars: false,
    show_scores: false,
    send_notifications_to_email: false,
    bot_account: false,
    show_bot_accounts: false,
    show_read_posts: false,
    show_new_post_notifs: false,
  },
  isLoading = false,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: values,
  });

  const uploadImage = useImageUploaderFather();

  const uploadAvatar = useCallback(
    async (file: File) => {
      const fileUploaded = await uploadImage({ file });
      if (fileUploaded) {
        form.setFieldValue("avatar", fileUploaded.fileUrl);
      }
    },
    [form, uploadImage]
  );

  const avatarUploader = useUploader({
    upload: uploadAvatar,
  });

  const handleAvatarChange = useCallback(
    (file: File) => {
      avatarUploader.handleFileChange(file);
    },
    [avatarUploader]
  );

  const uploadBanner = useCallback(
    async (file: File) => {
      const fileUploaded = await uploadImage({ file });
      if (fileUploaded) {
        form.setFieldValue("banner", fileUploaded.fileUrl);
      }
    },
    [form, uploadImage]
  );

  const bannerUploader = useUploader({
    upload: uploadBanner,
  });

  const handleBannerChange = useCallback(
    (file: File) => {
      bannerUploader.handleFileChange(file);
    },
    [bannerUploader]
  );

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="sm">
        <TextInput
          withAsterisk
          label={capitalize(t("display_name"))}
          {...form.getInputProps("display_name")}
        />
        <Textarea
          minRows={2}
          autosize
          withAsterisk
          label={capitalize(t("bio"))}
          {...form.getInputProps("bio")}
        />
        <TextInput
          label={capitalize(t("email"))}
          {...form.getInputProps("email")}
        />
        <Input.Wrapper label={t("avatar")}>
          <Group noWrap>
            <Avatar
              src={avatarUploader.uploading ? undefined : form.values.avatar}
              size="xl"
              radius="md"
            >
              {avatarUploader.uploading ? (
                <Loader size="sm" color="gray" />
              ) : (
                <IconPhoto stroke={1.5} />
              )}
            </Avatar>
            <FileInput
              placeholder={t("upload_image")}
              icon={<IconUpload size={14} stroke={1.5} />}
              onChange={handleAvatarChange}
            />
          </Group>
        </Input.Wrapper>
        <Input.Wrapper label={t("upload_banner")}>
          <Group noWrap>
            <Avatar
              src={bannerUploader.uploading ? undefined : form.values.banner}
              size="xl"
              radius="md"
            >
              {bannerUploader.uploading ? (
                <Loader size="sm" color="gray" />
              ) : (
                <IconPhoto stroke={1.5} />
              )}
            </Avatar>
            <FileInput
              placeholder={t("upload_image")}
              icon={<IconUpload size={14} stroke={1.5} />}
              onChange={handleBannerChange}
            />
          </Group>
        </Input.Wrapper>
        <Switch
          label={t("show_nsfw")}
          {...form.getInputProps("show_nsfw", {
            type: "checkbox",
          })}
        />
        <Switch
          label={t("show_scores")}
          {...form.getInputProps("show_scores", {
            type: "checkbox",
          })}
        />
        <Switch
          label={t("show_avatars")}
          {...form.getInputProps("show_avatars", {
            type: "checkbox",
          })}
        />
        <Switch
          label={t("bot_account")}
          {...form.getInputProps("bot_account", {
            type: "checkbox",
          })}
        />
        <Switch
          label={t("show_bot_accounts")}
          {...form.getInputProps("show_bot_accounts", {
            type: "checkbox",
          })}
        />
        <Switch
          label={t("show_read_posts")}
          {...form.getInputProps("show_read_posts", {
            type: "checkbox",
          })}
        />
        <Switch
          label={t("show_new_post_notifs")}
          {...form.getInputProps("show_new_post_notifs", {
            type: "checkbox",
          })}
        />
        <Switch
          label={t("send_notifications_to_email")}
          {...form.getInputProps("send_notifications_to_email", {
            type: "checkbox",
          })}
        />
        <Button type="submit" radius="md" loading={isLoading}>
          {capitalize(t("save"))}
        </Button>
      </Stack>
    </Box>
  );
};
