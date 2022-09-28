import { Container, Card } from "@mantine/core";
import { buildKeyFromParams } from "baza/utils/key";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";
import { useSiteUser } from "features/app/hooks/useSiteUser";
import {
  ProfileForm,
  Values as ProfileValues,
} from "features/profile/forms/ProfileForm";
import { useProfileUpdate } from "features/profile/hooks/useProfileUpdate";
import { useCallback, useMemo } from "react";
import { SitePage } from "types";

const ProfilePage: SitePage = () => {
  const user = useSiteUser();
  const profileUpdate = useProfileUpdate();

  const handleProfileSubmit = useCallback(
    async (values: ProfileValues) => {
      try {
        showProgress("settings-editing");

        await profileUpdate.mutateAsync(values);

        showSuccess("settings-editing");
      } catch {
        showFail("settings-editing");
      }
    },
    [profileUpdate]
  );

  const values = useMemo(() => {
    if (!user.localUserView) {
      return undefined;
    }

    const {
      theme,
      lang,
      show_nsfw,
      default_sort_type,
      default_listing_type,
      show_avatars,
      show_bot_accounts,
      show_scores,
      show_read_posts,
      show_new_post_notifs,
      email,
      send_notifications_to_email,
    } = user.localUserView.local_user;

    const { avatar, banner, display_name, bot_account, bio, matrix_user_id } =
      user.localUserView.person;

    const person_blocks =
      user.myUserInfo
        ?.map((myUserInfo) => myUserInfo.person_blocks)
        .unwrapOr([]) || [];

    const community_blocks =
      user.myUserInfo
        ?.map((myUserInfo) => myUserInfo.community_blocks)
        .unwrapOr([]) || [];

    return {
      theme,
      lang,
      show_nsfw,
      default_sort_type,
      default_listing_type,
      avatar: avatar.unwrapOr(""),
      banner: banner.unwrapOr(""),
      matrix_user_id: matrix_user_id.unwrapOr(""),
      display_name: display_name.unwrapOr(""),
      show_avatars,
      bot_account,
      show_bot_accounts,
      show_scores,
      show_read_posts,
      show_new_post_notifs,
      email: email.unwrapOr(""),
      bio: bio.unwrapOr(""),
      send_notifications_to_email,
      person_blocks,
      community_blocks,
    };
  }, [user.localUserView, user.myUserInfo]);

  return (
    <Container size={690} p={0}>
      <Card p="lg" sx={{ overflow: "visible" }} radius="md">
        <ProfileForm
          key={buildKeyFromParams(values)}
          values={values}
          onSubmit={handleProfileSubmit}
          isLoading={profileUpdate.isLoading}
        />
      </Card>
    </Container>
  );
};

export default ProfilePage;
