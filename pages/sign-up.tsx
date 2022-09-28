import { Container, Card, ThemeIcon, Stack, Text, Button } from "@mantine/core";
import { IconArrowRight, IconCheck } from "@tabler/icons";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";
import {
  Errors as SignUpFormErrors,
  SignUpForm,
  Values as SignUpFormValues,
} from "features/sign-up/forms/SignUpForm";
import { useSignUp } from "features/sign-up/hooks/useSignUp";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";
import isJson from "is-json";
import { useAuth } from "features/app/hooks/useAuth";
import { redirectOnSignedIn } from "features/app/components/AppAuthRedirect";
import Script from "next/script";

const SignUpPage: SitePage = () => {
  const signUp = useSignUp();
  const auth = useAuth();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<SignUpFormErrors>();
  const [values, setValues] = useState<SignUpFormValues>();

  const handleSubmit = useCallback(
    async (values: SignUpFormValues) => {
      setValues(values);

      showProgress("signUp");

      try {
        const result = await signUp.mutateAsync(values);

        if (result.jwt) {
          auth.loginViaToken(result.jwt);
        }
      } catch (error) {
        const text = await (error as any).response.text();

        if (isJson(text)) {
          const data: any = JSON.parse(text);

          if (data.error === "user_already_exists") {
            setErrors({
              username: t("user_already_exists"),
            });
          }

          if (data.error === "email_already_exists") {
            setErrors({
              email: t("email_already_exists"),
            });
          }

          if (data.error === "invalid_password") {
            setErrors({
              password: t("invalid_password"),
            });
          }

          if (data.error === "passwords_dont_match") {
            setErrors({
              password: t("passwords_dont_match"),
              password_verify: t("passwords_dont_match"),
            });
          }
        } else {
          showFail("signUp", "Limits exceeded");

          return Promise.reject();
        }

        showFail("signUp");
        return Promise.reject();
      }

      showSuccess("signUp");
    },
    [auth, signUp, t]
  );

  return (
    <>
      <Script id="google-analytics-send-event" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {'send_to': 'AW-964930766/-M0WCMfqnOIDEM7ZjswD'});
        `}
      </Script>
      <Container size="xs" p={0}>
        <Card p="lg" radius="md">
          {signUp.isSuccess ? (
            <Stack sx={{ alignItems: "center" }}>
              <ThemeIcon size="xl" color="green" variant="filled" radius="xl">
                <IconCheck />
              </ThemeIcon>
              {signUp.data?.verify_email_sent && (
                <Text>{t("verify_email_sent")}</Text>
              )}
              {signUp.data?.registration_created && (
                <Text>{t("registration_application_sent")}</Text>
              )}
              <Link
                href={
                  signUp.data?.jwt?.isSome()
                    ? { pathname: "/communities" }
                    : { pathname: "/" }
                }
              >
                <Button
                  component="a"
                  leftIcon={<IconArrowRight />}
                  variant="subtle"
                >
                  {signUp.data?.jwt?.isSome() ? t("communities") : t("posts")}
                </Button>
              </Link>
            </Stack>
          ) : (
            <SignUpForm
              onSubmit={handleSubmit}
              isLoading={signUp.isLoading}
              errors={errors}
              values={values}
              key={JSON.stringify(errors)}
            />
          )}
        </Card>
      </Container>
    </>
  );
};

SignUpPage.authRedirect = redirectOnSignedIn;

export default SignUpPage;
