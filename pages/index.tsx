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
import Head from "next/head";

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

      <PostList posts={posts} key="home-feed" />
    </>
  );
};

FeedPage.Navbar = AppNavbar;
FeedPage.Aside = AppAside;

export default FeedPage;
