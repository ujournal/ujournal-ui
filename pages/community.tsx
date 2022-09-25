import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
  usePostList,
} from "features/post/hooks/usePostList";
import { AppNavbar } from "features/app/components/AppNavbar";
import { AppCommunityAside } from "features/app/components/AppCommunityAside";
import { CommunityItem } from "features/community/components/CommunityItem";
import { useCommunity } from "features/community/hooks/useCommunity";
import { CommunityView } from "ujournal-lemmy-js-client";
import { useMemo } from "react";
import { Container, Stack } from "@mantine/core";

const CommunityPage: SitePage = () => {
  const params = useRouterQuery<FetchPostsParams>({
    ...fetchPostsParamsDefault,
  });
  const { communityName } = useRouterQuery<{
    communityName: string | undefined;
  }>({
    communityName: undefined,
  });
  const posts = usePostList({ params });
  const community = useCommunity({ communityName });

  const communityView = useMemo(() => {
    if (community.data) {
      return community.data?.community_view as Omit<
        CommunityView,
        "subscribed"
      >;
    }

    return undefined;
  }, [community.data]);

  const communityModerators = useMemo(() => {
    if (community.data) {
      return community.data?.moderators;
    }

    return undefined;
  }, [community.data]);

  return (
    <Stack>
      {communityView && (
        <Container size={690} p={0} sx={{ width: "100%" }}>
          <CommunityItem {...communityView} moderators={communityModerators} />
        </Container>
      )}

      <PostList posts={posts} key="communiy-feed" />
    </Stack>
  );
};

CommunityPage.Navbar = AppNavbar;
CommunityPage.Aside = AppCommunityAside;

export default CommunityPage;
