import { Container, Card, Loader, Center } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  PostForm,
  Values as PostFormValues,
} from "features/post/forms/PostForm";
import { usePost } from "features/post/hooks/usePost";
import { usePostUpsert } from "features/post/hooks/usePostUpsert";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { SitePage } from "types";
import { queryClient } from "baza/reactQuery";
import { showProgress, showFail, showSuccess } from "baza/utils/notifications";
import { redirectOnSignedOut } from "features/app/components/AppAuthRedirect";
import { AppNavbar } from "features/app/components/AppNavbar";
import { AppCreatePostAside } from "features/app/components/AppCreatePostAside";

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

  const postValues = useMemo(() => {
    if (post.data) {
      return {
        community_id: post.data.post_view.post.community_id,
        body: post.data.post_view.post.body.unwrapOr(""),
        name: post.data.post_view.post.name,
        url: post.data.post_view.post.url.unwrapOr(""),
        nsfw: post.data.post_view.post.nsfw,
      };
    }

    return undefined;
  }, [post.data]);

  if (post.isSuccess && post.data) {
    return (
      <Container size={690} p={0}>
        <Card
          p={largerThanSm ? "xl" : "sm"}
          sx={{ overflow: "visible" }}
          radius="md"
        >
          <PostForm
            postId={post.data.post_view.post.id}
            values={postValues}
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

EditPostPage.Navbar = AppNavbar;
EditPostPage.Aside = AppCreatePostAside;
EditPostPage.authRedirect = redirectOnSignedOut;

export default EditPostPage;
