import { ActionIcon, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPaperclip, IconSend } from "@tabler/icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export type Values = {
  content: string;
};

export const CommentForm: FC<{
  values?: Values;
  isLoading?: boolean;
  onSubmit: (values: Values) => void;
}> = ({ values, onSubmit }) => {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: values,
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group noWrap align="flex-end" spacing="xs">
        <Textarea
          size={"md"}
          autosize
          placeholder={t("comment_here")}
          sx={{ flex: "1 1 0" }}
          rightSection={
            <ActionIcon color="gray" size="lg" variant="subtle" mr="sm" mb={6}>
              <IconPaperclip stroke={1.5} />
            </ActionIcon>
          }
          styles={{
            rightSection: {
              alignItems: "flex-end",
            },
          }}
        ></Textarea>
        <ActionIcon color="blue" size={47} variant="light">
          <IconSend stroke={1.5} />
        </ActionIcon>
      </Group>
    </form>
  );
};
