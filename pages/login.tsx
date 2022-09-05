import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "features/auth/components/LoginForm";
import { useAuth } from "features/auth/hooks/useAuth";
import { SitePage } from "types";
import { showNotification } from "@mantine/notifications";
import { useCallback } from "react";
import { Card, Container } from "@mantine/core";
import { useRouter } from "next/router";
import {
  isBrowser,
} from "./settings";

var gapi: any;

if (isBrowser()) {
    gapi = require("gapi-script").gapi;
}

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

    if (isBrowser()) {
        const onGoogleSignIn = user => {
            console.log('user', user);

            let user_data = {
                username: user.wt.Ad,
                email: user.wt.cu,
                logo_url: user.wt.hK,
            }

            console.log('user_data', user_data);

            auth.google_login(user_data);
            showNotification({message: "Google"});
            // TODO push after success login
            // router.push("/");
        }

        gapi.signin2.render('gs2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onGoogleSignIn
        });
    }

  return (
    <Container size="xs">
      <Card p="md">
        <LoginForm
          values={{ usernameOrEmail: "", password: "" }}
          onSubmit={handleLogin}
        />
      </Card>
    </Container>
  );
};

export default LoginPage;
