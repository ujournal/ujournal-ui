import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { useEffect, useMemo } from "react";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
  usePostList,
} from "features/post/hooks/usePostList";
import { AppNavbar } from "features/app/components/AppNavbar";
import { AppAside } from "features/app/components/AppAside";
import { useNavLinks } from "features/app/hooks/useNavLinks";
import PullToRefresh from "react-simple-pull-to-refresh";
import Head from "next/head";
import { Box } from "@mantine/core";
import { RefreshContent } from "baza/components/PullToRefresh/RefreshContent";
import { PullDownContent } from "baza/components/PullToRefresh/PullDownContent";
import { PostEdition } from "features/post/components/PostEdition";
import { ListingType, SortType } from "ujournal-lemmy-js-client";

const FeedPage: SitePage = () => {
  const params = useRouterQuery<FetchPostsParams>({
    ...fetchPostsParamsDefault,
  });
  const posts = usePostList({ params });
  const navLinks = useNavLinks();
  const activeNavLink = useMemo(
    () => navLinks.find((item) => item.active),
    [navLinks]
  );

  useEffect(() => {
    posts.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        {activeNavLink?.label && (
          <title>{activeNavLink?.label} - UJournal</title>
        )}
      </Head>

      {params.type === ListingType.All && params.sort === SortType.Hot && (
        <PostEdition />
      )}

      <Box sx={(theme) => ({ margin: -theme.spacing.md })}>
        <Box
          component={PullToRefresh}
          onRefresh={posts.refetch}
          refreshingContent={<RefreshContent />}
          pullingContent={<PullDownContent />}
        >
          <Box sx={(theme) => ({ margin: theme.spacing.md })}>
            <PostList posts={posts} key="home-feed" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

FeedPage.Navbar = AppNavbar;
FeedPage.Aside = AppAside;

export default FeedPage;
