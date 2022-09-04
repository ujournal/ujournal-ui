import { Box, Container, Loader, Stack } from "@mantine/core";
import { Post } from "./Post";
import { FC, useCallback } from "react";
import { usePosts } from "../hooks/usePosts";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useMemo } from "react";
import { flattenDepth, get, map } from "lodash";
import { Center } from "@mantine/core";

export const PostList: FC = () => {
  const posts = usePosts();
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const [sentryRef] = useInfiniteScroll({
    loading: posts.isLoading,
    hasNextPage: true,
    onLoadMore: posts.fetchNextPage,
    rootMargin: "0px 0px 400px 0px",
    disabled: false,
  });

  const postsMerged = useMemo(() => {
    const data =
      flattenDepth(
        map(posts.data?.pages, (item) => get(item, "posts")),
        1
      ) || [];

    return { ...posts, data };
  }, [posts]);

  return (
    <Container size={690} px={0} mx={smallerThanSm ? "-md" : undefined}>
      <Stack spacing="md">
        <DataList {...postsMerged} component={Post} itemKey="post.id" />
        <Center ref={sentryRef}>
          {posts.isSuccess && posts.isFetching && <Loader />}
        </Center>
      </Stack>
    </Container>
  );
};
