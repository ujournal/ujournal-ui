import { Center, Container } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
import { SitePage } from "types";

const PostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { postId } = useRouterQuery<{ postId: number }>({ postId: -1 });
  const post = usePost({ postId });

  return (
    <Container size={690} px={0} mx={largerThanSm ? undefined : "-md"}>
      {post.isSuccess ? (
        <Post {...post.data.post_view} showBody />
      ) : (
        <PostLoader />
      )}
    </Container>
  );
};

export default PostPage;
