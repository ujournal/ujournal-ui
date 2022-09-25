import { Some } from "@sniptt/monads/build";
import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { omit } from "lodash";
import { CreateCommunity, EditCommunity } from "ujournal-lemmy-js-client";
import { Values as CommunityFormValues } from "../forms/CommunityForm";

export const useCommunityUpsert = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(
    ["communityUpsert"],
    async (values: CommunityFormValues) => {
      if (values.id) {
        return await lemmyClient.editCommunity(
          new EditCommunity({
            ...omit(values, ["_id", "name"]),
            title: Some(values.title),
            community_id: values.id,
            icon: Some(values.icon),
            banner: Some(values.banner),
            description: Some(values.description),
            nsfw: Some(values.nsfw),
            posting_restricted_to_mods: Some(values.posting_restricted_to_mods),
            auth: auth.token.ok().unwrapOr(""),
          })
        );
      } else {
        return await lemmyClient.createCommunity(
          new CreateCommunity({
            ...values,
            icon: Some(values.icon),
            banner: Some(values.banner),
            description: Some(values.description),
            nsfw: Some(values.nsfw),
            posting_restricted_to_mods: Some(values.posting_restricted_to_mods),
            auth: auth.token.ok().unwrapOr(""),
          })
        );
      }
    }
  );
};
