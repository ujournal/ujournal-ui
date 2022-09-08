import { Stack, Button, Textarea, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "lodash";
import { FC } from "react";
import dynamic from "next/dynamic";
import { CommunitySelect } from "features/community/components/CommunitySelect";

import { useTranslation } from "react-i18next";
import { EmbedField } from "features/embed/components/EmbedField";

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

  const form = useForm({
    initialValues: values,
  });

  const isEditing = true;

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
          onInput={(event) => {
            event.currentTarget.value = event.currentTarget.value.replace(
              /\n/g,
              ""
            );
          }}
          minRows={1}
        />

        <EmbedField {...form.getInputProps("url")} />

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
