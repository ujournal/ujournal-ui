import { Box, Card, Container, Stack, Title } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { formatShortNum } from "baza/utils/number";
import { CommentForm } from "features/comment/components/CommentForm";
import { CommentList } from "features/comment/components/CommentList";
import { Post } from "features/post/components/Post";
import { PostLoader } from "features/post/components/PostLoader";
import { usePost } from "features/post/hooks/usePost";
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
          <Container size={650} px={0} sx={{ width: "100%" }}>
            <Stack>
              <Title size="h3" id="comments">
                {t("number_of_comments", {
                  count: post.data?.post_view.counts?.comments || 0,
                  formattedCount: formatShortNum(
                    post.data?.post_view.counts?.comments || 0
                  ),
                })}
              </Title>

              <Box>
                <CommentForm values={{}} onSubmit={console.log} />
              </Box>

              <CommentList {...post} data={post.data?.comments || []} />
            </Stack>
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default PostPage;
