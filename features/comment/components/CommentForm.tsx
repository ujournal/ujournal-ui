import { ActionIcon, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPhotoUp, IconSend } from "@tabler/icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export type Values = {
  content: string;
};

export const CommentForm: FC<{
  values?: Values;
  isLoading?: boolean;
  onSubmit: (values: Values) => void;
}> = ({ values = { content: "" }, onSubmit, isLoading = false }) => {
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
            <ActionIcon
              color="gray"
              size="lg"
              variant="subtle"
              mr="sm"
              mb={6}
              disabled={isLoading}
            >
              <IconPhotoUp size={24} stroke={1.5} />
            </ActionIcon>
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
          <IconSend stroke={1.5} />
        </ActionIcon>
      </Group>
    </form>
  );
};
