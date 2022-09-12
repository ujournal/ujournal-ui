import { Stack, TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { capitalize } from "baza/utils/string";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Values = {
  username: string;
  email: string;
  password: string;
  password_repeat: string;
};

export const SignUpForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
}> = ({
  values = {
    username: "",
    email: "",
    password: "",
    password_repeat: "",
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
          label={capitalize(t("username"))}
          {...form.getInputProps("username")}
        />

        <TextInput
          withAsterisk
          label={capitalize(t("email"))}
          {...form.getInputProps("email")}
        />

        <TextInput
          type="password"
          withAsterisk
          label={capitalize(t("password"))}
          {...form.getInputProps("password")}
        />

        <TextInput
          type="password"
          withAsterisk
          label={capitalize(t("password_repeat"))}
          {...form.getInputProps("password_repeat")}
        />

        <Group position="center" mt="md">
          <Button type="submit">{t("sign_up")}</Button>
        </Group>
      </Stack>
    </form>
  );
};
