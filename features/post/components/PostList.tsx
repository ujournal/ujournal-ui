import { Container, Stack } from "@mantine/core";
import { Post } from "./Post";
import { FC, useCallback } from "react";
import { usePosts } from "../hooks/usePosts";
import { DataList } from "components/DataList";

export const PostList: FC = () => {
  const posts = usePosts();

  const transformPosts = useCallback((data: any) => data?.posts, []);

  return (
    <Container size={690} px={0}>
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
