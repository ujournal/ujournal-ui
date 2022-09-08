import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { FC, useEffect } from "react";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
  usePostList,
} from "features/post/hooks/usePostList";
import { AppNavbar } from "features/app/components/AppNavbar";

const FeedPage: SitePage = () => {
  const params = useRouterQuery<FetchPostsParams>({
    ...fetchPostsParamsDefault,
  });
  const posts = usePostList({ params });

  useEffect(() => {
    posts.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PostList posts={posts} key="home-feed" />
    </>
  );
};

const AppAside: FC = () => {
  return <></>;
};

FeedPage.Navbar = AppNavbar;
FeedPage.Aside = AppAside;

export default FeedPage;
