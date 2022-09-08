import { Container, Card, Loader, Center } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  PostForm,
  Values as PostFormValues,
} from "features/post/components/PostForm";
import { usePost } from "features/post/hooks/usePost";
import { usePostUpsert } from "features/post/hooks/usePostUpsert";
import { capitalize } from "baza/utils/string";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";

const EditPostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { postId } = useRouterQuery<{ postId: number }>({ postId: -1 });
  const post = usePost({ postId });
  const upsertPost = usePostUpsert();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (values: PostFormValues) => {
      const post = await upsertPost.mutateAsync({
        ...values,
        postId: Number(postId),
      });

      showNotification({
        message: capitalize(t("saved")),
      });

      router.push({
        pathname: "/post",
        query: { postId: post.post_view.post.id },
      });
    },
    [postId, router, t, upsertPost]
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
