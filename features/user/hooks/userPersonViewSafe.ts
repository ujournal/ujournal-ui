import { useQuery } from "@tanstack/react-query";
import { GetPersonDetails } from "ujournal-lemmy-js-client";
import { useAuth } from "../../app/hooks/useAuth";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { Some } from "@sniptt/monads";
import { SortType } from "ujournal-lemmy-js-client/dist/interfaces/others";

// the name of hook is different from api, because we use only person_view from response,
// we don't pass some input params, that would return comment and post objects
export const usePersonViewSafe = ({
  personId,
  username,
}: {
  personId?: number | undefined;
  username?: string | undefined;
}) => {
  const client = useLemmyClient();
  const auth = useAuth();

  return useQuery(
    ["personViewSafe", personId, username, auth.token.ok().unwrapOr("")],
    async () => {
      if ((personId === -1 || !personId) && !username) {
        return undefined;
      }

      const { person_view } = await client.getPersonDetails(
        new GetPersonDetails({
          person_id: Some(personId),
          username: Some(username),
          sort: Some(SortType.New),
          page: Some(1),
          limit: Some(0),
          community_id: Some(0),
          saved_only: Some(false),
          auth: auth.token.ok(),
        })
      );
      return {
        person: person_view.person,
        commentCount: person_view.counts.comment_count,
        postCount: person_view.counts.post_count,
        commentScore: person_view.counts.comment_score,
        postScore: person_view.counts.post_score,
        totalScore:
          person_view.counts.comment_score + person_view.counts.post_score,
      };
    }
  );
};
