import { Box, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "baza/utils/string";
import { values } from "lodash";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export type Values = {};

export const SettingsForm: FC<{
  values?: Values;
  isLoading?: boolean;
  onSubmit: (values: Values) => void;
}> = ({ values = {}, isLoading = false, onSubmit }) => {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: values,
  });

  return <Box component="form" onSubmit={form.onSubmit(onSubmit)}></Box>;
};
