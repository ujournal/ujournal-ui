import {
  Stack,
  Button,
  Textarea,
  Checkbox,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "baza/utils/string";
import { FC, SyntheticEvent, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { CommunitySelect } from "features/community/components/CommunitySelect";
import { useTranslation } from "react-i18next";
import { EmbedField } from "features/embed/components/EmbedField";
import { useUrlMetadata } from "baza/hooks/useUrlMetadata";
import { IconCopy } from "@tabler/icons";

const TextEditor = dynamic(
  async () => (await import("baza/components/TextEditor")).TextEditor,
  { ssr: false }
);

export type Values = {
  community_id: number;
  name: string;
  url: string;
  body: string;
  nsfw: boolean;
};

export const PostForm: FC<{
  postId?: string;
  values?: Values;
  onSubmit: (values: Values) => void;
}> = ({
  postId,
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

  const form = useForm({
    initialValues: values,
  });

  const urlMetadata = useUrlMetadata(form.values.url);

  const handleNameInput = useCallback(
    (event: SyntheticEvent<HTMLTextAreaElement>) => {
      event.currentTarget.value = event.currentTarget.value.replace(/\n/g, "");
    },
    []
  );

  const handleCopySuggestedName = useCallback(() => {
    if (urlMetadata?.data) {
      form.setFieldValue("name", urlMetadata.data.metadata.title.unwrapOr(""));
    }
  }, [form, urlMetadata.data]);

  const isNameSuggested = useMemo(
    () =>
      urlMetadata.data &&
      urlMetadata.data.metadata.title.unwrapOr("") &&
      form.values.name !== urlMetadata.data.metadata.title.unwrapOr(""),
    [form.values.name, urlMetadata.data]
  );

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
              "&::-webkit-scrollbar": {
                display: "none",
              },
            },
          }}
          size={22}
          onInput={handleNameInput}
          minRows={1}
          rightSection={
            isNameSuggested && (
              <Tooltip
                label={capitalize(
                  t("copy_suggested_title", {
                    title: urlMetadata?.data?.metadata.title.unwrapOr(""),
                  })
                )}
              >
                <ActionIcon onClick={handleCopySuggestedName}>
                  <IconCopy />
                </ActionIcon>
              </Tooltip>
            )
          }
        />

        <EmbedField {...form.getInputProps("url")} urlMetadata={urlMetadata} />

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
          {postId ? capitalize(t("save")) : capitalize(t("create"))}
        </Button>
      </Stack>
    </form>
  );
};
