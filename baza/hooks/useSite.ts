import { useQuery } from "@tanstack/react-query";
import { GetSite } from "ujournal-lemmy-js-client";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useLemmyClient } from "./useLemmyClient";

export const useSite = () => {
  const client = useLemmyClient();
  const auth = useAuth();

  return useQuery(["site", auth.token.ok().unwrapOr("")], async () => {
    return await client.getSite(new GetSite({ auth: auth.token.ok() }));
  });
};
