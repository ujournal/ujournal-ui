import { Box, Card, Container, Stack, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { capitalize } from "baza/utils/string";
import { AppCommunityAside } from "features/app/components/AppCommunityAside";
import { AppNavbar } from "features/app/components/AppNavbar";
import {
  CommentForm,
  Values as CommentFormValues,
} from "features/comment/forms/CommentForm";
import { CommentList } from "features/comment/components/CommentList";
import { CommentTitle } from "features/comment/components/CommentTitle";
import { useCommentUpsert } from "features/comment/hooks/useCommentUpsert";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";

const PostPage: SitePage = () => {
  const { t } = useTranslation();
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const { postId: _postId } = useRouterQuery<{ postId: number }>({
    postId: -1,
  });
  const postId = Number(_postId);
  const post = usePost({ postId });
  const commentUpsert = useCommentUpsert();
  const router = useRouter();

  const handleCommentSubmit = useCallback(
    async (values: CommentFormValues) => {
      await commentUpsert.mutateAsync({
        ...values,
        postId,
      });
    },
    [commentUpsert, postId]
  );

  useEffect(() => {
    if (post.data?.post_view.post.deleted) {
      router.replace("/");
      showNotification({
        message: capitalize(t("deleted")),
      });
    }
  }, [post.data?.post_view.post.deleted, router, t]);

  useEffect(() => {
    if (post.data?.post_view.post && location.hash === "#comments") {
      window.document.getElementById(`comments`)?.scrollIntoView();
    }
  }, [post.data?.post_view.post]);

  if (post.isSuccess && post.data && post.data.post_view.post.deleted) {
    return <></>;
  }

  return (
    <>
      <Head>
        {post.data?.post_view.post.name && (
          <title>
            {post.data?.post_view.post.name} - {process.env.NEXT_PUBLIC_TITLE}
          </title>
        )}
      </Head>

      <Container px={0} mx={largerThanSm ? undefined : "-md"} mb="md">
        {post.isSuccess && post.data ? (
          <Post {...post.data.post_view} full commentsAsText showPostCreator />
        ) : (
          <PostLoader />
        )}
      </Container>

      <Container px={0} mx={largerThanSm ? undefined : "-md"}>
        <Card radius={smallerThanSm ? 0 : "md"} sx={{ overflow: "visible" }}>
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

PostPage.Navbar = AppNavbar;
PostPage.Aside = AppCommunityAside;

export default PostPage;
