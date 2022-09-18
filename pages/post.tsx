import { Box, Card, Container, Stack, Title } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { AppNavbar } from "features/app/components/AppNavbar";
import {
  CommentForm,
  Values as CommentFormValues,
} from "features/comment/components/CommentForm";
import { CommentList } from "features/comment/components/CommentList";
import { CommentTitle } from "features/comment/components/CommentTitle";
import { useCommentUpsert } from "features/comment/hooks/useCommentUpsert";
import { CommunityItem } from "features/community/components/CommunityItem";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
import { FC, useCallback } from "react";
import { SitePage } from "types";

const PostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const { postId: _postId } = useRouterQuery<{ postId: number }>({
    postId: -1,
  });
  const postId = Number(_postId);
  const post = usePost({ postId });
  const commentUpsert = useCommentUpsert();

  const handleCommentSubmit = useCallback(
    async (values: CommentFormValues) => {
      await commentUpsert.mutateAsync({
        ...values,
        postId,
      });
    },
    [commentUpsert, postId]
  );

  return (
    <>
      <Container px={0} mx={largerThanSm ? undefined : "-md"} mb="md">
        {post.isSuccess && post.data ? (
          <Post {...post.data.post_view} full commentsAsText showPostCreator />
        ) : (
          <PostLoader />
        )}
      </Container>

      <Container px={0} mx={largerThanSm ? undefined : "-md"}>
        <Card radius={smallerThanSm ? 0 : "md"}>
          <Container size={650} px={0}>
            <Stack>
              <Title size="h3" id="comments">
                <CommentTitle counts={post.data?.post_view.counts} />
              </Title>

              <Box sx={{ width: "100%" }}>
                <CommentForm
                  onSubmit={handleCommentSubmit}
                  isLoading={commentUpsert.isLoading || post.isLoading}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <CommentList
                  data={post.data?.comments || []}
                  isLoading={post.isLoading}
                  postId={post.data?.post_view.post.id}
                />
              </Box>

              {(post.data?.comments || []).length >= 1 && (
                <Box sx={{ width: "100%" }}>
                  <CommentForm
                    onSubmit={handleCommentSubmit}
                    isLoading={commentUpsert.isLoading || post.isLoading}
                  />
                </Box>
              )}
            </Stack>
          </Container>
        </Card>
      </Container>
    </>
  );
};

const Aside: FC = () => {
  const { postId: _postId } = useRouterQuery<{ postId: number }>({
    postId: -1,
  });
  const postId = Number(_postId);
  const post = usePost({ postId });

  if (!post.data) {
    return null;
  }

  return (
    <Box p={4}>
      <CommunityItem {...(post.data?.community_view as any)} compact />
    </Box>
  );
};

PostPage.Navbar = AppNavbar;
PostPage.Aside = Aside;

export default PostPage;
