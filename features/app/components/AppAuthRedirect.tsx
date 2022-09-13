import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import { SiteAuth, SiteExtraProps } from "types";
import { useAuth } from "../hooks/useAuth";

export const redirectOnSignedIn = (auth: SiteAuth) => {
  console.log("auth", auth.token.unwrapOr("err"));
  if (auth.token.isOk()) {
    const redirect = new URLSearchParams(location.search).get("redirect");
    return redirect && !redirect.includes("/sign-") ? redirect : "/";
  }

  return undefined;
};

export const redirectOnSignedOut = (auth: SiteAuth) => {
  if (auth.token.isErr()) {
    return "/sign-in/";
  }

  return undefined;
};

export const AppAuthRedirect: FC<{
  children: ReactNode;
  authRedirect?: SiteExtraProps["authRedirect"];
}> = ({ children, authRedirect }) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.inited) {
      const redirect = authRedirect && authRedirect(auth);

      if (redirect) {
        router.replace(
          `${redirect}${
            location.pathname.includes("/sign-")
              ? ""
              : `?redirect=${location.pathname}`
          }`
        );
      }
    }
  }, [authRedirect, auth, router]);

  return <>{children}</>;
};
