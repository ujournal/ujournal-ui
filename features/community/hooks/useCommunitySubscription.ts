import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { queryClient } from "baza/reactQuery";
import { useAuth } from "features/app/hooks/useAuth";
import { FollowCommunity } from "ujournal-lemmy-js-client";

export const useCommunitySubscription = () => {
  const auth = useAuth();
  const lemmyClient = useLemmyClient();

  return useMutation(
    ["communitySubscription", auth.token.unwrapOr("")],
    async ({
      communityId,
      follow,
    }: {
      communityId: number;
      follow: boolean;
    }) => {
      const result = await lemmyClient.followCommunity(
        new FollowCommunity({
          community_id: communityId,
          follow,
          auth: auth.token.ok().unwrapOr(""),
        })
      );

      queryClient.invalidateQueries(["communities"]);
      queryClient.invalidateQueries(["post"]);

      return result;
    }
  );
};
