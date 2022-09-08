import { Container, Card } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import {
  PostForm,
  Values as PostFormValues,
} from "features/post/components/PostForm";
import { usePostUpsert } from "features/post/hooks/usePostUpsert";
import { capitalize } from "baza/utils/string";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";

const CreatePostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const upsertPost = usePostUpsert();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (values: PostFormValues) => {
      const post = await upsertPost.mutateAsync(values);

      showNotification({
        message: capitalize(t("saved")),
      });

      router.push({
        pathname: "/post",
        query: { postId: post.post_view.post.id },
      });
    },
    [router, t, upsertPost]
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
          onSubmit={handleSubmit}
        />
      </Card>
    </Container>
  );
};

export default CreatePostPage;
