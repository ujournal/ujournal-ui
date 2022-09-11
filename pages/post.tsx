import { Box, Card, Container, Stack, Title } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { formatShortNum } from "baza/utils/number";
import { AppNavbar } from "features/app/components/AppNavbar";
import { CommentForm } from "features/comment/components/CommentForm";
import { CommentList } from "features/comment/components/CommentList";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
import { FC } from "react";
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

  return (
    <>
      <Container px={0} mx={largerThanSm ? undefined : "-md"} mb="md">
        {post.isSuccess ? (
          <Post {...post.data.post_view} showBody commentsAsText />
        ) : (
          <PostLoader />
        )}
      </Container>

      <Container px={0} mx={largerThanSm ? undefined : "-md"}>
        <Card radius={smallerThanSm ? 0 : "md"}>
          <Container size={650} px={0}>
            <Stack>
              <Title size="h3" id="comments">
                {t("number_of_comments", {
                  count: post.data?.post_view.counts?.comments || 0,
                  formattedCount: formatShortNum(
                    post.data?.post_view.counts?.comments || 0
                  ),
                })}
              </Title>

              <Box sx={{ width: "100%" }}>
                <CommentForm values={{}} onSubmit={console.log} />
              </Box>

              <Box sx={{ width: "100%" }}>
                <CommentList {...post} data={post.data?.comments || []} />
              </Box>
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
