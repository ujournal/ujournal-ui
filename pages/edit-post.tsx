import { Container, Card, Loader, Center } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { PostEditForm } from "features/post-edit/components/PostEditForm";
import { usePost } from "features/post/hooks/usePost";
import { SitePage } from "types";

const EditPostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { postId } = useRouterQuery<{ postId: number }>({ postId: -1 });
  const post = usePost({ postId });

  if (post.isSuccess) {
    return (
      <Container size={690} p={0}>
        <Card
          p={largerThanSm ? "xl" : "sm"}
          sx={{ overflow: "visible" }}
          radius="md"
        >
          <PostEditForm
            values={{
              community_id: post.data?.post_view.post.community_id,
              body: post.data?.post_view.post.body.unwrapOr(""),
              name: post.data?.post_view.post.name,
              url: post.data?.post_view.post.url.unwrapOr(""),
              nsfw: post.data?.post_view.post.nsfw,
            }}
            onSubmit={console.log}
          />
        </Card>
      </Container>
    );
  }

  return (
    <Center>
      <Loader />
    </Center>
  );
};

export default EditPostPage;
