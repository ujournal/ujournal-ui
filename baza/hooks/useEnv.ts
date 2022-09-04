import { useSetState } from "@mantine/hooks";
import { useEffect } from "react";

export const useEnv = () => {
  const [env, setEnv] = useSetState<{ isHttps: boolean }>({ isHttps: false });

  useEffect(() => {
    const isHttps = window.location.protocol.endsWith("s");

    setEnv({ isHttps });
  }, []);

  return env;
};
