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
import { CommunityView, ListingType, SortType } from "ujournal-lemmy-js-client";
import { FC, useMemo } from "react";
import { Container, Stack } from "@mantine/core";
import { PostEdition } from "features/post/components/PostEdition";

const CommunityPageEdition: FC = () => {
  const { communityName } = useRouterQuery<{
    communityName: string;
  }>({
    communityName: "",
  });

  const postList = usePostList({
    params: {
      type: ListingType.All,
      sort: SortType.TopDay,
      communityName,
      limit: 10,
    },
  });

  return <PostEdition {...postList} />;
};

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
    <Stack justify="stretch">
      {communityView && (
        <Container size={690} p={0} sx={{ width: "100%" }}>
          <CommunityItem {...communityView} moderators={communityModerators} />
        </Container>
      )}

      {communityView?.community.name === "gamesnewsua" && (
        <CommunityPageEdition />
      )}

      <Container size={690} p={0} sx={{ width: "100%" }}>
        <PostList posts={posts} key="communiy-feed" />
      </Container>
    </Stack>
  );
};

CommunityPage.Navbar = AppNavbar;
CommunityPage.Aside = AppCommunityAside;

export default CommunityPage;
