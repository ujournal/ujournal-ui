import { Container, Card, Loader, Center } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  PostForm,
  Values as PostFormValues,
} from "features/post/components/PostForm";
import { usePost } from "features/post/hooks/usePost";
import { usePostUpsert } from "features/post/hooks/usePostUpsert";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SitePage } from "types";
import { queryClient } from "baza/reactQuery";
import { showProgress, showFail, showSuccess } from "baza/utils/notifications";

const EditPostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { postId } = useRouterQuery<{ postId: number }>({ postId: -1 });
  const post = usePost({ postId });
  const upsertPost = usePostUpsert();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: PostFormValues) => {
      try {
        showProgress("post-editing");

        const post = await upsertPost.mutateAsync({
          ...values,
          name: values.name || "...",
          postId: Number(postId),
        });

        showSuccess("post-editing");

        await queryClient.invalidateQueries(["post"]);

        router.push({
          pathname: "/post",
          query: { postId: post.post_view.post.id },
        });
      } catch (error) {
        showFail("post-editing");
      }
    },
    [postId, router, upsertPost]
  );

  if (post.isSuccess) {
    return (
      <Container size={690} p={0}>
        <Card
          p={largerThanSm ? "xl" : "sm"}
          sx={{ overflow: "visible" }}
          radius="md"
        >
          <PostForm
            postId={post.data.post_view.post.id}
            values={{
              community_id: post.data?.post_view.post.community_id,
              body: post.data?.post_view.post.body.unwrapOr(""),
              name: post.data?.post_view.post.name,
              url: post.data?.post_view.post.url.unwrapOr(""),
              nsfw: post.data?.post_view.post.nsfw,
            }}
            isLoading={upsertPost.isLoading}
            onSubmit={handleSubmit}
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
