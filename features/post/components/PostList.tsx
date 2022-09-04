import { Container, Stack } from "@mantine/core";
import { Post } from "./Post";
import { FC, useCallback } from "react";
import { usePosts } from "../hooks/usePosts";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";

export const PostList: FC = () => {
  const posts = usePosts();
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const transformPosts = useCallback((data: any) => data?.posts, []);

  return (
    <Container size={690} px={0} mx={smallerThanSm ? "-md" : undefined}>
      <Stack spacing="md">
        <DataList
          {...posts}
          component={Post}
          transform={transformPosts}
          itemKey="post.id"
        />
      </Stack>
    </Container>
  );
};
