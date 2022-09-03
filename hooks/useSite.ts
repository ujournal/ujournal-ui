import { useQuery } from "@tanstack/react-query";
import { GetSite } from "ujournal-lemmy-js-client";
import { useLemmyAuth } from "./useLemmyAuth";
import { useLemmyClient } from "./useLemmyClient";

export const useSite = () => {
  const client = useLemmyClient();
  const auth = useLemmyAuth();

  return useQuery(["site", auth.token.ok().unwrapOr("")], async () => {
    return await client.getSite(new GetSite({ auth: auth.token.ok() }));
  });
};
