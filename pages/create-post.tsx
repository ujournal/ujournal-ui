import { Container, Card } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import {
  PostForm,
  Values as PostFormValues,
} from "features/post/components/PostForm";
import { usePostUpsert } from "features/post/hooks/usePostUpsert";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SitePage } from "types";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";

const CreatePostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const upsertPost = usePostUpsert();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: PostFormValues) => {
      try {
        showProgress("post-creating");

        const post = await upsertPost.mutateAsync({
          ...values,
          name: values.name || "...",
          url: values.url || `https://example.com/?${Math.random()}`,
        });

        showSuccess("post-creating");

        router.push({
          pathname: "/post",
          query: { postId: post.post_view.post.id },
        });
      } catch (error) {
        showFail("post-creating");
      }
    },
    [router, upsertPost]
  );

  return (
    <Container size={690} p={0}>
      <Card
        p={largerThanSm ? "xl" : "sm"}
        sx={{ overflow: "visible" }}
        radius="md"
      >
        <PostForm
          values={{
            community_id: -1,
            body: "",
            name: "",
            url: "",
            nsfw: false,
          }}
          isLoading={upsertPost.isLoading}
          onSubmit={handleSubmit}
        />
      </Card>
    </Container>
  );
};

export default CreatePostPage;
