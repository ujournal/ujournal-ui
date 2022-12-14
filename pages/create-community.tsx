import { Container, Card } from "@mantine/core";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";
import { redirectOnSignedOut } from "features/app/components/AppAuthRedirect";
import {
  CommunityForm,
  Values as CommunityFormValues,
} from "features/community/forms/CommunityForm";
import { useCommunityUpsert } from "features/community/hooks/useCommunityUpsert";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SitePage } from "types";

const CreateCommunityPage: SitePage = () => {
  const comunityUpsert = useCommunityUpsert();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values: CommunityFormValues) => {
      try {
        showProgress("community-creating");

        const {
          community_view: { community },
        } = await comunityUpsert.mutateAsync(values);

        showSuccess("community-creating");

        router.push({
          pathname: "/community",
          query: { communityName: community.name },
        });
      } catch {
        showFail("community-creating");
      }
    },
    [comunityUpsert, router]
  );

  return (
    <Container size={690} p={0}>
      <Card p="lg" sx={{ overflow: "visible" }} radius="md">
        <CommunityForm
          onSubmit={onSubmit}
          isLoading={comunityUpsert.isLoading}
        />
      </Card>
    </Container>
  );
};

CreateCommunityPage.authRedirect = redirectOnSignedOut;

export default CreateCommunityPage;
