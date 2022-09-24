import { ActionIcon, Box, Group, Loader, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLayoutSidebarRightCollapse, IconSend } from "@tabler/icons";
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
import { MentionsPopover } from "features/mentions/components/MentionsPopover";
import { PersonSafe } from "ujournal-lemmy-js-client";

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

  const personMention = useMemo(() => {
    const mathces = form.values.content.match(/\B@\w+$/g);
    return mathces ? mathces[0] : undefined;
  }, [form.values.content]);

  const handlePersonSelect = useCallback(
    (person: PersonSafe) => {
      if (personMention) {
        form.setFieldValue(
          "content",
          form.values.content.replace(
            new RegExp(`${personMention}$`),
            `@${person.name}`
          )
        );
      }
    },
    [form, personMention]
  );

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Group noWrap align="flex-end" spacing="xs">
        <MentionsPopover q={personMention} onSelect={handlePersonSelect}>
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
        </MentionsPopover>

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
    </Box>
  );
};
