import { Box, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "baza/utils/string";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export type Values = {};

export const CommunityForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
}> = ({ values, onSubmit }) => {
  const { t } = useTranslation();
  const form = useForm({
    initialValues: values,
  });

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label={capitalize(t("username"))}
          {...form.getInputProps("username")}
        />
      </Stack>
    </Box>
  );
};
