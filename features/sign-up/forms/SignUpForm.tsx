import {
  Stack,
  TextInput,
  Group,
  Button,
  Alert,
  Checkbox,
  PasswordInput,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PasswordInputWithRequirements } from "baza/components/PasswordInputWithRequirements";
import { capitalize } from "baza/utils/string";
import { useSite } from "features/app/hooks/useSite";
import Link from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export type Values = {
  username: string;
  email: string;
  password: string;
  password_verify: string;
  show_nsfw: boolean;
};

export type Errors = Partial<{ [key in keyof Values]: string }>;

export const SignUpForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
  isLoading?: boolean;
  errors?: Errors;
}> = ({
  values = {
    username: "",
    email: "",
    password: "",
    password_verify: "",
    show_nsfw: false,
  },
  onSubmit,
  isLoading = false,
  errors,
}) => {
  const { t } = useTranslation();
  const site = useSite();

  const emailRequired =
    site.data?.site_view.unwrap().site.require_email_verification;

  const form = useForm({
    initialValues: values,
    initialErrors: errors,
  });

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="sm">
        <TextInput
          withAsterisk
          label={capitalize(t("username"))}
          {...form.getInputProps("username")}
        />

        <TextInput
          withAsterisk={emailRequired}
          label={capitalize(t("email"))}
          placeholder={
            emailRequired ? "email@example.com" : capitalize(t("optional"))
          }
          {...form.getInputProps("email")}
        />

        {!emailRequired && (
          <Alert color="orange">{t("no_password_reset")}</Alert>
        )}

        <PasswordInputWithRequirements
          withAsterisk
          label={capitalize(t("password"))}
          {...form.getInputProps("password")}
        />

        <PasswordInput
          withAsterisk
          label={capitalize(t("verify_password"))}
          {...form.getInputProps("password_verify")}
        />

        <Checkbox
          label={t("show_nsfw")}
          {...form.getInputProps("show_nsfw", { type: "checkbox" })}
        />

        <Stack spacing="xs">
          <Group position="center" mt="md">
            <Button type="submit" disabled={isLoading}>
              {t("sign_up")}
            </Button>
          </Group>
          <Group position="center">
            <Link href={{ pathname: "/sign-in" }} passHref>
              <Button component="a" variant="subtle">
                {t("login")}
              </Button>
            </Link>
          </Group>
        </Stack>
      </Stack>
    </Box>
  );
};
