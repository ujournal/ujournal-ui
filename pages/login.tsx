import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "features/auth/components/LoginForm";
import { useAuth } from "features/auth/hooks/useAuth";
import { SitePage } from "types";
import { showNotification } from "@mantine/notifications";
import { useCallback } from "react";
import { Box, Card, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

  const onGoogleSignIn = useCallback(
    async (user: any) => {
      console.log("user", user);

      let user_data = {
        username: user.wt.Ad,
        email: user.wt.cu,
        logo_url: user.wt.hK,
      };

      console.log("user_data", user_data);

      auth.loginViaGoogle(user_data);

      showNotification({ message: "Google" });
      // TODO push after success login
      // router.push("/");
    },
    [auth]
  );

  useEffect(() => {
    (async () => {
      const { loadGapiInsideDOM } = await import("gapi-script");

      const gapi = await loadGapiInsideDOM();

      gapi.signin2.render("gs2", {
        scope: "https://www.googleapis.com/auth/plus.login",
        width: 200,
        height: 50,
        longtitle: true,
        theme: "dark",
        onsuccess: onGoogleSignIn,
      });
    })();
  }, [onGoogleSignIn]);

  return (
    <Container size="xs">
      <Card p="md">
        <LoginForm
          values={{ usernameOrEmail: "", password: "" }}
          onSubmit={handleLogin}
        />
        <Box id="ga2" />
      </Card>
    </Container>
  );
};

export default LoginPage;
