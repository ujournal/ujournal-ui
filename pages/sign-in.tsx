import { useMutation } from "@tanstack/react-query";
import { SignInForm } from "features/sign-in/forms/SignInForm";
import { useAuth } from "features/app/hooks/useAuth";
import { SitePage } from "types";
import { useCallback } from "react";
import { Card, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";
import { redirectOnSignedIn } from "features/app/components/AppAuthRedirect";

const SignInPage: SitePage = () => {
  const auth = useAuth();
  const router = useRouter();

  const onError = useCallback(() => {
    showFail("signIn");
  }, []);

  const { mutateAsync: handleSignIn } = useMutation(
    async (crendentials: { usernameOrEmail: string; password: string }) => {
      showProgress("signIn");

      await auth.login(crendentials);

      showSuccess("signIn");

      router.push("/");
    },
    { onError }
  );

  return (
    <Container size="xs" p={0}>
      <Card p="lg" radius="md">
        <SignInForm
          values={{ usernameOrEmail: "", password: "" }}
          onSubmit={handleSignIn}
        />
      </Card>
    </Container>
  );
};

SignInPage.authRedirect = redirectOnSignedIn;

export default SignInPage;
