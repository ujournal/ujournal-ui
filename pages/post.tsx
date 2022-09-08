import { Container, Stack, Title } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { CommentList } from "features/comment/components/CommentList";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
import { SitePage } from "types";

const PostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { postId: _postId } = useRouterQuery<{ postId: number }>({
    postId: -1,
  });
  const postId = Number(_postId);
  const post = usePost({ postId });

  return (
    <Stack spacing="md">
      <Container
        px={0}
        mx={largerThanSm ? undefined : "-md"}
        sx={{ flex: "1 1 0", width: "100%" }}
      >
        {post.isSuccess ? (
          <Post {...post.data.post_view} showBody />
        ) : (
          <PostLoader />
        )}
      </Container>

      <Container
        px={0}
        mx={largerThanSm ? undefined : "-md"}
        sx={{ flex: "1 1 0", width: "100%" }}
      >
        <CommentList
          {...post}
          data={post.data?.comments || []}
          counts={post.data?.post_view.counts}
        />
      </Container>
    </Stack>
  );
};

export default PostPage;
