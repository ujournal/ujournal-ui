import { useMutation } from "@tanstack/react-query";
import { SignInForm } from "features/auth/components/SignInForm";
import { useAuth } from "features/auth/hooks/useAuth";
import { SitePage } from "types";
import { useCallback } from "react";
import { Card, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";

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
    <Container size="xs">
      <Card p="lg" radius="md">
        <SignInForm
          values={{ usernameOrEmail: "", password: "" }}
          onSubmit={handleSignIn}
        />
      </Card>
    </Container>
  );
};

export default SignInPage;
