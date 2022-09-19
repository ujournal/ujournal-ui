import { Box } from "@mantine/core";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { CommunityItem } from "features/community/components/CommunityItem";
import { useCommunity } from "features/community/hooks/useCommunity";
import { usePost } from "features/post/hooks/usePost";
import { FC, useMemo } from "react";
import { CommunityView } from "ujournal-lemmy-js-client";

export const AppCommunityAside: FC = () => {
  const { postId: _postId, communityName } = useRouterQuery<{
    postId: number;
    communityName: string | undefined;
  }>({
    postId: -1,
    communityName: undefined,
  });
  const postId = Number(_postId);
  const post = usePost({ postId });
  const community = useCommunity({ communityName });

  const communityView = useMemo(() => {
    if (post.data) {
      return post.data?.community_view as Omit<CommunityView, "subscribed">;
    }

    if (community.data) {
      return community.data?.community_view as Omit<
        CommunityView,
        "subscribed"
      >;
    }

    return undefined;
  }, [community.data, post.data]);

  if (!communityView) {
    return null;
  }

  return (
    <Box p={4}>
      <CommunityItem {...communityView} compact />
    </Box>
  );
};
