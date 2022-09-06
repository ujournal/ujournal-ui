import { Center, Container, Loader } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { Post } from "features/post/components/Post";
import { usePost } from "features/post/hooks/usePost";
import { SitePage } from "types";

const PostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { postId } = useRouterQuery<{ postId: number }>({ postId: -1 });
  const post = usePost({ postId });

  if (post.isSuccess) {
    return (
      <Container size={690} px={0} mx={largerThanSm ? undefined : "-md"}>
        <Post {...post.data.post_view} />
      </Container>
    );
  }

  return (
    <Center>
      <Loader />
    </Center>
  );
};

export default PostPage;
