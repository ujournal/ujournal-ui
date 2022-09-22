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
import { generatePostPlaceholderUrl } from "features/post/utils/postUrl";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";

const CreatePostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const upsertPost = usePostUpsert();
  const router = useRouter();
  const communityId = parseInt(router.query.communityId as string, 10) || -1;
  const [values, setValues] = useLocalStorage<PostFormValues>({
    key: "create-post",
    defaultValue: {
      community_id: communityId,
      body: "",
      name: "",
      url: "",
      nsfw: false,
    },
  });
  const [focused, setFocused] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<string>("");

  const handleSubmit = useCallback(
    async (values: PostFormValues) => {
      try {
        showProgress("post-creating");

        const post = await upsertPost.mutateAsync({
          ...values,
          name: values.name || "...",
          url: values.url || generatePostPlaceholderUrl(),
        });

        showSuccess("post-creating");

        setValues({
          community_id: -1,
          body: "",
          name: "",
          url: "",
          nsfw: false,
        });

        router.push({
          pathname: "/post",
          query: { postId: post.post_view.post.id },
        });
      } catch (error) {
        showFail("post-creating");
      }
    },
    [router, setValues, upsertPost]
  );

  const handleChange = useCallback(
    (values: PostFormValues) => {
      if (focused) {
        setValues(values);
      } else {
        setFormKey(
          `${values.community_id}_${values.name.length}_${values.body.length}`
        );
      }
    },
    [focused, setValues]
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  return (
    <Container size={690} p={0}>
      <Card
        p={largerThanSm ? "xl" : "sm"}
        sx={{ overflow: "visible" }}
        radius="md"
      >
        <PostForm
          key={formKey}
          values={values}
          isLoading={upsertPost.isLoading}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </Card>
    </Container>
  );
};

export default CreatePostPage;
