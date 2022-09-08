import { Container, Stack, Title } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { formatShortNum } from "baza/utils/number";
import { CommentList } from "features/comment/components/CommentList";
import { useCommentList } from "features/comment/hooks/useCommentList";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";

const PostPage: SitePage = () => {
  const { t } = useTranslation();
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { postId } = useRouterQuery<{ postId: number }>({ postId: -1 });
  const post = usePost({ postId });
  const commentList = useCommentList({ postId });

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
        <CommentList {...commentList} counts={post.data?.post_view.counts} />
      </Container>
    </Stack>
  );
};

export default PostPage;
