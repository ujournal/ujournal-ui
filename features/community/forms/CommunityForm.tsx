import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FileInput,
  Group,
  Input,
  Loader,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPhoto, IconUpload } from "@tabler/icons";
import { capitalize } from "baza/utils/string";
import { ChangeEvent, FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { useUploader } from "baza/hooks/useUploader";
import { useImageUploaderFather } from "baza/hooks/useImageUploaderFather";

export type Values = {
  id?: number;
  name: string;
  title: string;
  icon: string;
  banner: string;
  description: string;
  nsfw: boolean;
  posting_restricted_to_mods: boolean;
};

export const CommunityForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
  isLoading?: boolean;
}> = ({ values, onSubmit, isLoading }) => {
  const { t } = useTranslation();
  const form = useForm({
    initialValues: values,
  });
  const uploadImage = useImageUploaderFather();

  const uploadIcon = useCallback(
    async (file: File) => {
      const fileUploaded = await uploadImage({ file });
      if (fileUploaded) {
        form.setFieldValue("icon", fileUploaded.fileUrl);
      }
    },
    [form, uploadImage]
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

  const iconUploader = useUploader({
    upload: uploadIcon,
  });

  const bannerUploader = useUploader({
    upload: uploadBanner,
  });

  const handleNameInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.currentTarget.value = cyrillicToTranslit({
        preset: "uk",
      }).transform(event.currentTarget.value, "_");
    },
    []
  );

  const handleIconChange = useCallback(
    (file: File) => {
      iconUploader.handleFileChange(file);
    },
    [iconUploader]
  );

  const handleBannerChange = useCallback(
    (file: File) => {
      bannerUploader.handleFileChange(file);
    },
    [bannerUploader]
  );

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label={capitalize(t("name"))}
          {...form.getInputProps("name")}
          description={t("name_explain")}
          onInput={handleNameInput}
          disabled={Boolean(values?.id)}
        />
        <TextInput
          withAsterisk
          label={capitalize(t("display_name"))}
          {...form.getInputProps("title")}
          description={t("display_name_explain")}
        />
        <Input.Wrapper label={t("upload_icon")}>
          <Group noWrap>
            <Avatar
              src={iconUploader.uploading ? undefined : form.values?.icon}
              size="xl"
              radius="md"
            >
              {iconUploader.uploading ? (
                <Loader size="sm" color="gray" />
              ) : (
                <IconPhoto stroke={1.5} />
              )}
            </Avatar>
            <FileInput
              placeholder={t("upload_image")}
              icon={<IconUpload size={14} stroke={1.5} />}
              onChange={handleIconChange}
            />
          </Group>
        </Input.Wrapper>
        <Input.Wrapper label={t("upload_banner")}>
          <Group noWrap>
            <Avatar
              src={bannerUploader.uploading ? undefined : form.values?.banner}
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
        <Textarea
          minRows={2}
          autosize
          label={capitalize(t("description"))}
          {...form.getInputProps("description")}
        />
        <Checkbox
          label={t("nsfw")}
          {...form.getInputProps("nsfw", { type: "checkbox" })}
        />
        <Checkbox
          label={t("only_mods_can_post_in_community")}
          {...form.getInputProps("posting_restricted_to_mods", {
            type: "checkbox",
          })}
        />
        <Button type="submit" disabled={isLoading}>
          {capitalize(values?.id ? t("save") : t("create"))}
        </Button>
      </Stack>
    </Box>
  );
};
