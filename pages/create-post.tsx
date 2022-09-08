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
import { IconCheck } from "@tabler/icons";

const CreatePostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const upsertPost = usePostUpsert();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (values: PostFormValues) => {
      try {
        const post = await upsertPost.mutateAsync(values);

        showNotification({
          color: "teal",
          icon: <IconCheck size={16} />,
          message: capitalize(t("saved")),
        });

        router.push({
          pathname: "/post",
          query: { postId: post.post_view.post.id },
        });
      } catch (error) {
        showNotification({
          color: "red",
          message: `Oops. Something went wrong`,
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      }
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
