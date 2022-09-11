import { Box, Card, Container, Stack, Title } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { AppNavbar } from "features/app/components/AppNavbar";
import { CommentForm } from "features/comment/components/CommentForm";
import { CommentList } from "features/comment/components/CommentList";
import { CommentTitle } from "features/comment/components/CommentTitle";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
import { FC } from "react";
import { SitePage } from "types";

const PostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const { postId: _postId } = useRouterQuery<{ postId: number }>({
    postId: -1,
  });
  const postId = Number(_postId);
  const post = usePost({ postId });
  return (
    <>
      <Container px={0} mx={largerThanSm ? undefined : "-md"} mb="md">
        {post.isSuccess ? (
          <Post {...post.data.post_view} full commentsAsText />
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
                <CommentForm values={{ content: "" }} onSubmit={console.log} />
              </Box>

              <Box sx={{ width: "100%" }}>
                <CommentList {...post} data={post.data?.comments || []} />
              </Box>

              {(post.data?.comments || []).length >= 1 && (
                <Box sx={{ width: "100%" }}>
                  <CommentForm
                    values={{ content: "" }}
                    onSubmit={console.log}
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
  return null;
};

PostPage.Navbar = AppNavbar;
PostPage.Aside = Aside;

export default PostPage;
