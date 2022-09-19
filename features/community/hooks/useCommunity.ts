import { None, Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { GetCommunity } from "ujournal-lemmy-js-client";

export const useCommunity = ({
  communityName,
}: {
  communityId?: number;
  communityName?: string;
}) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useQuery(
    ["community", { token: auth.token.unwrapOr(""), communityName }],
    async () => {
      if (!communityName) {
        return null;
      }

      return await lemmyClient.getCommunity(
        new GetCommunity({
          id: None,
          name: Some(communityName),
          auth: auth.token.ok(),
        })
      );
    }
  );
};
