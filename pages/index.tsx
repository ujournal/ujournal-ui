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
import { PullToRefresh } from "react-js-pull-to-refresh";
import Head from "next/head";
import { PullDownContent } from "baza/components/PullToRefresh/PullDownContent";
import { ReleaseContent } from "baza/components/PullToRefresh/ReleaseContent";
import { RefreshContent } from "baza/components/PullToRefresh/RefreshContent";
import { Box } from "@mantine/core";

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

      <Box sx={(theme) => ({ margin: -theme.spacing.md })}>
        <Box
          component={PullToRefresh}
          pullDownContent={<PullDownContent />}
          releaseContent={<ReleaseContent />}
          refreshContent={<RefreshContent />}
          pullDownThreshold={200}
          onRefresh={posts.refetch}
          triggerHeight={60}
          backgroundColor="transparent"
          startInvisible
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
