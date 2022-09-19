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

const CommunityPage: SitePage = () => {
  const params = useRouterQuery<FetchPostsParams>({
    ...fetchPostsParamsDefault,
  });
  const posts = usePostList({ params });

  return (
    <>
      <PostList posts={posts} key="communiy-feed" />
    </>
  );
};

CommunityPage.Navbar = AppNavbar;
CommunityPage.Aside = AppCommunityAside;

export default CommunityPage;
