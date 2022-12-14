import { FC } from "react";
import { useForm } from "@mantine/form";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { capitalize } from "baza/utils/string";
import Link from "next/link";

type Values = {
  usernameOrEmail: string;
  password: string;
};

export const SignInForm: FC<{
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
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
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

        <Stack spacing="xs">
          <Group position="center">
            <Button type="submit">{t("login")}</Button>
          </Group>
          <Group position="center">
            <Link href={{ pathname: "/sign-up" }} passHref>
              <Button component="a" variant="subtle">
                {t("sign_up")}
              </Button>
            </Link>
          </Group>
        </Stack>
      </Stack>
    </Box>
  );
};
