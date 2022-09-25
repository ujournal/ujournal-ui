import { Container, Card } from "@mantine/core";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";
import { redirectOnSignedOut } from "features/app/components/AppAuthRedirect";
import {
  CommunityForm,
  Values as CommunityFormValues,
} from "features/community/forms/CommunityForm";
import { useCommunity } from "features/community/hooks/useCommunity";
import { useCommunityUpsert } from "features/community/hooks/useCommunityUpsert";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { SitePage } from "types";

const CreateCommunityPage: SitePage = () => {
  const { communityName } = useRouterQuery<{ communityName: string }>({
    communityName: "",
  });
  const comunityUpsert = useCommunityUpsert();
  const router = useRouter();
  const community = useCommunity({ communityName });

  const onSubmit = useCallback(
    async (values: CommunityFormValues) => {
      try {
        showProgress("community-editing");

        const {
          community_view: { community },
        } = await comunityUpsert.mutateAsync(values);

        showSuccess("community-editing");

        router.push({
          pathname: "/community",
          query: { communityName: community.name },
        });
      } catch {
        showFail("community-editing");
      }
    },
    [comunityUpsert, router]
  );

  const communityData = useMemo(() => {
    if (community.data) {
      return {
        id: community.data.community_view.community.id,
        name: community.data.community_view.community.name,
        title: community.data.community_view.community.title,
        icon: community.data.community_view.community.icon.unwrapOr(""),
        banner: community.data.community_view.community.banner.unwrapOr(""),
        description:
          community.data.community_view.community.description.unwrapOr(""),
        nsfw: community.data.community_view.community.nsfw,
        posting_restricted_to_mods:
          community.data.community_view.community.posting_restricted_to_mods,
      };
    }

    return undefined;
  }, [community.data]);

  return (
    <Container size={690} p={0}>
      <Card p="lg" sx={{ overflow: "visible" }} radius="md">
        <CommunityForm
          key={communityData?.id}
          values={communityData}
          onSubmit={onSubmit}
          isLoading={comunityUpsert.isLoading}
        />
      </Card>
    </Container>
  );
};

CreateCommunityPage.authRedirect = redirectOnSignedOut;

export default CreateCommunityPage;
