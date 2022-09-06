import {
  Stack,
  TextInput,
  Button,
  Textarea,
  Select,
  ActionIcon,
  Checkbox,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "lodash";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhotoUp } from "@tabler/icons";
import dynamic from "next/dynamic";
import { CommunitySelect } from "features/community/components/CommunitySelect";
import { Embed } from "features/embed/components/Embed";

const TextEditor = dynamic(
  async () =>
    (await import("baza/components/TextEditor")).TextEditor,
  { ssr: false }
);

type Values = {
  community_id: -1;
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

        {form.values.url ? (
          <Box mx="-xl">
            <Embed src={form.values.url} />
          </Box>
        ) : (
          <TextInput
            withAsterisk
            placeholder={`${t(
              "url"
            )} YouTube, Vimeo, Twitter, Telegram, Facebook, Instagram...`}
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

        <TextEditor placeholder={capitalize(t("body"))} mb="md" />

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
