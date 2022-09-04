import { Err, None, Some, Option, Ok } from "@sniptt/monads";
import {
  createContext,
  createElement,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Login } from "ujournal-lemmy-js-client";
import { useLemmyClient } from "../../../baza/hooks/useLemmyClient";
import cookies from "browser-cookies";
import { useEnv } from "../../../baza/hooks/useEnv";
import jwtDecode from "jwt-decode";

type Claims = {
  sub: number;
  iss: string;
  iat: number;
};

type Session = {
  claims: Claims;
  jwt: string;
};

export const LemmyAuthContext = createContext<{
  session: Option<Session>;
  setSession: (session: Option<Session>) => void;
}>({ session: None, setSession: () => undefined });

export const LemmyAuthProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Option<Session>>(None);

  return createElement(
    LemmyAuthContext.Provider,
    {
      value: { session, setSession },
    },
    children
  );
};

export const useAuth = () => {
  const { session, setSession } = useContext(LemmyAuthContext);
  const lemmyClient = useLemmyClient();
  const { isHttps } = useEnv();

  const restoreSession = useCallback(() => {
    const jwt = cookies.get("jwt");

    if (jwt) {
      const session = Some({ jwt, claims: jwtDecode(jwt) as Claims });
      setSession(session);
    }
  }, [setSession]);

  const login = useCallback(
    async ({
      usernameOrEmail,
      password,
    }: {
      usernameOrEmail: string;
      password: string;
    }) => {
      let expires = new Date();
      expires.setDate(expires.getDate() + 365);

      const { jwt } = await lemmyClient.login(
        new Login({
          username_or_email: usernameOrEmail,
          password: password,
        })
      );

      localStorage.setItem("jwt", jwt.unwrap());

      cookies.set("jwt", jwt.unwrap(), { expires, secure: isHttps });

      restoreSession();
    },
    [isHttps, lemmyClient, restoreSession]
  );

  const logout = useCallback(() => {
    cookies.erase("jwt");
    setSession(None);
  }, [setSession]);

  const jwt = useMemo(() => {
    const jwt = session.map((session) => session.jwt);

    if (jwt.isSome()) {
      return Ok(jwt.unwrap());
    }

    return Err<string, string>("No JWT cookie found");
  }, [session]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return {
    token: jwt,
    login,
    logout,
  };
};
