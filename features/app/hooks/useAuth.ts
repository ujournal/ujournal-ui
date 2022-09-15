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
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import cookies from "browser-cookies";
import { useEnv } from "baza/hooks/useEnv";
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
  const [inited, setInited] = useState<boolean>(false);

  const getToken = useCallback(() => {
    const jwt = session.map((session) => session.jwt);

    if (jwt.isSome()) {
      return Ok(jwt.unwrap());
    }

    return Err<string, string>("No JWT cookie found");
  }, [session]);

  const restoreSession = useCallback(() => {
    const token = cookies.get("jwt");

    if (token) {
      const session = Some({ jwt: token, claims: jwtDecode(token) as Claims });
      setSession(session);
    }
  }, [setSession]);

  const loginViaToken = useCallback(
    (token: Option<string>) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + 365);

      localStorage.setItem("jwt", token.unwrap());

      cookies.set("jwt", token.unwrap(), { expires, secure: isHttps });

      restoreSession();
    },
    [isHttps, restoreSession]
  );

  const login = useCallback(
    async ({
      usernameOrEmail,
      password,
    }: {
      usernameOrEmail: string;
      password: string;
    }) => {
      const { jwt } = await lemmyClient.login(
        new Login({
          username_or_email: usernameOrEmail,
          password: password,
        })
      );

      loginViaToken(jwt);
    },
    [lemmyClient, loginViaToken]
  );

  const logout = useCallback(() => {
    cookies.erase("jwt");
    setSession(None);
  }, [setSession]);

  const token = useMemo(() => getToken(), [getToken]);
  const loggedIn = useMemo(() => token.isOk(), [token]);

  useEffect(() => {
    restoreSession();
    setInited(true);
  }, [restoreSession]);

  return {
    inited,
    token,
    loggedIn,
    login,
    loginViaToken,
    logout,
  };
};
