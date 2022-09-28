import { Some } from "@sniptt/monads";
import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { SaveUserSettings } from "ujournal-lemmy-js-client";
import { Values as ProfileValues } from "../forms/ProfileForm";

export const useProfileUpdate = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(["profileUpdate"], async (values: ProfileValues) => {
    return await lemmyClient.saveUserSettings(
      new SaveUserSettings({
        show_nsfw: Some(values.show_nsfw),
        theme: Some(values.theme),
        default_sort_type: Some(values.default_sort_type),
        default_listing_type: Some(values.default_listing_type),
        lang: Some(values.lang),
        avatar: Some(values.avatar),
        banner: Some(values.banner),
        display_name: Some(values.display_name),
        email: Some(values.email),
        bio: Some(values.bio),
        matrix_user_id: Some(values.matrix_user_id),
        show_avatars: Some(values.show_avatars),
        show_scores: Some(values.show_scores),
        send_notifications_to_email: Some(values.send_notifications_to_email),
        bot_account: Some(values.bot_account),
        show_bot_accounts: Some(values.show_bot_accounts),
        show_read_posts: Some(values.show_read_posts),
        show_new_post_notifs: Some(values.show_new_post_notifs),
        auth: auth.token.ok().unwrap(),
      })
    );
  });
};
