import { FC } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { capitalize } from "baza/utils/string";

type Values = {
  usernameOrEmail: string;
  password: string;
};

export const LoginForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
}> = ({
  values = {
    usernameOrEmail: "",
    password: "",
  },
  onSubmit,
}) => {
  const { t } = useTranslation();
  const form = useForm({
    initialValues: values,
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="sm">
        <TextInput
          withAsterisk
          label={capitalize(t("email_or_username"))}
          {...form.getInputProps("usernameOrEmail")}
        />

        <TextInput
          type="password"
          withAsterisk
          label={capitalize(t("password"))}
          {...form.getInputProps("password")}
        />

        <Group position="center" mt="md">
          <Button type="submit">{t("login")}</Button>
        </Group>
      </Stack>
    </form>
  );
};
