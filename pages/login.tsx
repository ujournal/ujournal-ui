import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "features/auth/components/LoginForm";
import { useAuth } from "features/auth/hooks/useAuth";
import { SitePage } from "types";
import { showNotification } from "@mantine/notifications";
import { useCallback } from "react";
import { Container } from "@mantine/core";
import { useRouter } from "next/router";

const LoginPage: SitePage = () => {
  const auth = useAuth();
  const router = useRouter();

  const onError = useCallback(() => {
    showNotification({
      message: "Ошибка",
    });
  }, []);

  const { mutateAsync: handleLogin } = useMutation(
    async (crendentials: { usernameOrEmail: string; password: string }) => {
      await auth.login(crendentials);
      showNotification({
        message: "Успішно увійшли",
      });
      router.push("/");
    },
    { onError }
  );

  return (
    <Container size="xs">
      <LoginForm
        values={{ usernameOrEmail: "", password: "" }}
        onSubmit={handleLogin}
      />
    </Container>
  );
};

export default LoginPage;
