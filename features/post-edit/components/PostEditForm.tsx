import {
  Stack,
  TextInput,
  Button,
  Textarea,
  ActionIcon,
  Checkbox,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "lodash";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhotoUp, IconTrash } from "@tabler/icons";
import dynamic from "next/dynamic";
import { CommunitySelect } from "features/community/components/CommunitySelect";
import { Embed } from "features/embed/components/Embed";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import isUrl from "validator/lib/isURL";

const TextEditor = dynamic(
  async () => (await import("baza/components/TextEditor")).TextEditor,
  { ssr: false }
);

type Values = {
  community_id: number;
  name: string;
  url: string;
  body: string;
  nsfw: boolean;
};

export const PostEditForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
}> = ({
  values = {
    community_id: -1,
    name: "",
    url: "",
    body: "",
    nsfw: false,
  },
  onSubmit,
}) => {
  const { t } = useTranslation();

  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const openRef = useRef<() => void>(null);

  const form = useForm({
    initialValues: values,
  });

  const isEditing = true;

  const handleFileUpload = useCallback(() => {}, []);

  const handleUploadClick = useCallback(() => {
    if (openRef.current) {
      openRef.current();
    }
  }, [openRef]);

  const handleEmbedRemove = useCallback(() => {
    form.setFieldValue("url", "");
  }, [form]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="xs">
        <CommunitySelect
          withAsterisk
          styles={{
            input: {
              borderWidth: 0,
              paddingLeft: 8,
              paddingRight: 8,
              marginLeft: -8,
              marginRight: -8,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.015)",
              },
            },
          }}
          {...form.getInputProps("community_id")}
          size="md"
        />

        <Textarea
          withAsterisk
          placeholder={capitalize(t("title"))}
          {...form.getInputProps("name")}
          autosize
          autoFocus
          styles={{
            input: {
              borderWidth: 0,
              fontWeight: 600,
              minHeight: 0,
              paddingLeft: 8,
              paddingRight: 8,
              marginLeft: -8,
              marginRight: -8,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.015)",
              },
            },
          }}
          size={22}
          onInput={(event) => {
            event.currentTarget.value = event.currentTarget.value.replace(
              /\n/g,
              ""
            );
          }}
          minRows={1}
        />

        <Dropzone.FullScreen
          accept={IMAGE_MIME_TYPE}
          onDrop={handleFileUpload}
          radius="md"
          openRef={openRef}
        >
          {capitalize(t("upload_image"))}
        </Dropzone.FullScreen>

        {isUrl(form.values.url) ? (
          <Box mx={smallerThanSm ? "-sm" : "-xl"} sx={{ position: "relative" }}>
            <Box sx={{ pointerEvents: "none" }}>
              <Embed src={form.values.url} />
            </Box>
            <ActionIcon
              variant="filled"
              onClick={handleEmbedRemove}
              radius="xl"
              sx={(theme) => ({
                position: "absolute",
                top: theme.spacing.sm,
                right: theme.spacing.sm,
              })}
              color="blue"
            >
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Box>
        ) : (
          <TextInput
            withAsterisk
            placeholder={`${t(
              "url"
            )} YouTube, Vimeo, Twitter, Telegram, Facebook, Instagram, SoundCloud...`}
            {...form.getInputProps("url")}
            sx={{ flex: "1 1 0" }}
            styles={{
              input: {
                borderWidth: 0,
                paddingLeft: 8,
                paddingRight: 8,
                marginLeft: -8,
                marginRight: -8,
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.015)",
                },
              },
            }}
            rightSection={
              <ActionIcon
                onClick={handleUploadClick}
                sx={{ backgroundColor: "#fff" }}
              >
                <IconPhotoUp stroke={1.5} />
              </ActionIcon>
            }
            size="md"
          />
        )}

        <TextEditor
          placeholder={capitalize(t("body"))}
          mb="md"
          {...form.getInputProps("body")}
        />

        <Checkbox
          label={t("nsfw")}
          {...form.getInputProps("nsfw", { type: "checkbox" })}
          mb="md"
        />

        <Button type="submit" size="lg">
          {isEditing ? capitalize(t("save")) : capitalize(t("create"))}
        </Button>
      </Stack>
    </form>
  );
};
