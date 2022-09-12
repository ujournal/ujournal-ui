import {
  Stack,
  Button,
  Textarea,
  Checkbox,
  ActionIcon,
  Tooltip,
  Box,
  Menu,
  Popover,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "baza/utils/string";
import { FC, SyntheticEvent, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { CommunitySelect } from "features/community/components/CommunitySelect";
import { useTranslation } from "react-i18next";
import { EmbedField } from "features/embed/components/EmbedField";
import { useUrlMetadata } from "baza/hooks/useUrlMetadata";
import { IconCopy, IconSettings } from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";

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
  postId?: number;
  values?: Values;
  isLoading?: boolean;
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
  isLoading = false,
  onSubmit,
}) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const { t } = useTranslation();

  const validate = useMemo(
    () => ({
      community_id: (value: number) => (value === -1 ? t("required") : null),
      url: (value: string) => (value.length === 0 ? t("required") : null),
    }),
    [t]
  );

  const form = useForm({
    initialValues: values,
    validate,
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

  const settingsButton = (
    <Popover trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button
          size="lg"
          loading={isLoading}
          leftIcon={<IconSettings stroke={1.5} />}
          pr="sm"
          radius="md"
        />
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Checkbox
          label={t("nsfw")}
          {...form.getInputProps("nsfw", { type: "checkbox" })}
        />
      </Popover.Dropdown>
    </Popover>
  );

  const submitButton = (
    <Button type="submit" size="lg" loading={isLoading} fullWidth radius="md">
      {postId ? capitalize(t("save")) : capitalize(t("create"))}
    </Button>
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
          disabled={Boolean(postId)}
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
              marginRight: 0,
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
                  <IconCopy stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            )
          }
        />

        <Box
          sx={(theme) => ({
            backgroundColor: theme.fn.rgba(theme.colors.blue[0], 0.5),
            marginLeft: -theme.spacing[smallerThanSm ? "sm" : "xl"],
            marginRight: -theme.spacing[smallerThanSm ? "sm" : "xl"],
            paddingLeft: theme.spacing[smallerThanSm ? "sm" : "xl"],
            paddingRight: theme.spacing[smallerThanSm ? "sm" : "xl"],
          })}
        >
          <EmbedField
            {...form.getInputProps("url")}
            urlMetadata={urlMetadata}
          />
        </Box>

        <TextEditor
          placeholder={capitalize(t("body"))}
          mb="md"
          {...form.getInputProps("body")}
        />

        {isLoading ? (
          submitButton
        ) : (
          <Button.Group>
            {settingsButton}
            {submitButton}
          </Button.Group>
        )}
      </Stack>
    </form>
  );
};
