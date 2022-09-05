import {
  Stack,
  TextInput,
  Group,
  Button,
  Textarea,
  Select,
  ActionIcon,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "lodash";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload } from "@tabler/icons";

type Values = {
  community_id: -1;
  name: string;
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
      <Stack spacing="sm">
        <Select
          withAsterisk
          label={capitalize(t("select_a_community"))}
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
          searchable
          {...form.getInputProps("community_id")}
        />

        <TextInput
          withAsterisk
          label={capitalize(t("title"))}
          {...form.getInputProps("name")}
        />

        <Dropzone.FullScreen
          accept={IMAGE_MIME_TYPE}
          onDrop={handleFileUpload}
          radius="md"
          openRef={openRef}
        >
          {capitalize(t("upload_image"))}
        </Dropzone.FullScreen>

        <TextInput
          withAsterisk
          label={t("url")}
          {...form.getInputProps("url")}
          sx={{ flex: "1 1 0" }}
          rightSection={
            <ActionIcon onClick={handleUploadClick}>
              <IconUpload />
            </ActionIcon>
          }
        />

        <Textarea
          withAsterisk
          label={capitalize(t("body"))}
          autosize
          minRows={4}
          {...form.getInputProps("body")}
        />

        <Checkbox
          label={t("nsfw")}
          {...form.getInputProps("nsfw", { type: "checkbox" })}
        />

        <Button type="submit">
          {isEditing ? capitalize(t("save")) : capitalize(t("create"))}
        </Button>
      </Stack>
    </form>
  );
};
