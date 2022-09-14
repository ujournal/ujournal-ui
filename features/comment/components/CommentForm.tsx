import { ActionIcon, Group, Loader, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons";
import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { UploadImageButton } from "baza/components/UploadImageButton";

export type Values = {
  parentId?: number;
  content: string;
};

export const CommentForm: FC<{
  values?: Values;
  isLoading?: boolean;
  autofocus?: boolean;
  onSubmit: (values: Values) => void;
}> = ({
  values = { content: "" },
  onSubmit,
  autofocus = false,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const contentFieldRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleContentKeyDown = useCallback(
    (event: SyntheticEvent<HTMLTextAreaElement, KeyboardEvent>) => {
      if (
        (event.nativeEvent.ctrlKey || event.nativeEvent.metaKey) &&
        event.nativeEvent.key === "Enter"
      ) {
        submitButtonRef.current?.click();
      }
    },
    []
  );

  useEffect(() => {
    if (autofocus) {
      contentFieldRef?.current?.focus();
    }
  }, [autofocus]);

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
          ref={contentFieldRef}
          disabled={isLoading}
          radius="md"
          onKeyDown={handleContentKeyDown}
        />

        <ActionIcon
          type="submit"
          color="blue"
          size={47}
          variant="light"
          disabled={isLoading}
          radius="md"
          ref={submitButtonRef}
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
