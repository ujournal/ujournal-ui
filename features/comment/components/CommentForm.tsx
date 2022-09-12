import { ActionIcon, Group, Loader, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { UploadImageButton } from "baza/components/UploadImageButton";

export type Values = {
  parentId?: number;
  content: string;
};

export const CommentForm: FC<{
  values?: Values;
  isLoading?: boolean;
  onSubmit: (values: Values) => void;
}> = ({ values = { content: "" }, onSubmit, isLoading = false }) => {
  const { t } = useTranslation();

  const validate = useMemo(
    () => ({
      content: (value: string) => {
        if (value === "") {
          return t("required");
        }

        return null;
      },
    }),
    [t]
  );

  const form = useForm({ validate, initialValues: values });

  const handleSubmit = useCallback(
    async (values: Values) => {
      await onSubmit(values);

      form.reset();
    },
    [form, onSubmit]
  );

  const handleFileUpload = useCallback(
    (fileUrl: string) => {
      form.setFieldValue(
        "content",
        `${form.values.content}\n![](${fileUrl})`.trim()
      );
    },
    [form]
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group noWrap align="flex-end" spacing="xs">
        <Textarea
          size={"md"}
          autosize
          placeholder={t("comment_here")}
          sx={{ flex: "1 1 0" }}
          rightSection={
            <UploadImageButton
              onUploaded={handleFileUpload}
              sx={{ backgroundColor: "#fff" }}
              mb={9}
              mr={9}
            />
          }
          styles={{
            rightSection: {
              alignItems: "flex-end",
            },
          }}
          {...form.getInputProps("content")}
          disabled={isLoading}
          radius="md"
        />

        <ActionIcon
          type="submit"
          color="blue"
          size={47}
          variant="light"
          disabled={isLoading}
          radius="md"
        >
          {isLoading ? (
            <Loader color="gray" size="sm" />
          ) : (
            <IconSend stroke={1.5} />
          )}
        </ActionIcon>
      </Group>
    </form>
  );
};
