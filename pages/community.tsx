import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
  usePostList,
} from "features/post/hooks/usePostList";
import { FC } from "react";
import { AppNavbar } from "features/app/components/AppNavbar";

const CommunityPage: SitePage = () => {
  const params = useRouterQuery<FetchPostsParams>({
    ...fetchPostsParamsDefault,
  });
  const posts = usePostList({ params });

  console.log("query (CommunityPage)", params);

  return (
    <>
      <PostList posts={posts} key="communiy-feed" />
    </>
  );
};
const AppAside: FC = () => {
  return <></>;
};

CommunityPage.Navbar = AppNavbar;
CommunityPage.Aside = AppAside;

export default CommunityPage;
