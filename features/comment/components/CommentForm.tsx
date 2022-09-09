import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export type Values = {};

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
      <Textarea autosize placeholder={t("comment_here")}></Textarea>
    </form>
  );
};
