import { Container, Loader, Stack } from "@mantine/core";
import { Post } from "./Post";
import { FC, useRef } from "react";
import { usePostList } from "../hooks/usePostList";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Center } from "@mantine/core";
import { PostListLoader } from "./PostListLoader";

export const PostList: FC<{ posts: ReturnType<typeof usePostList> }> = ({
  posts,
}) => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanMd = useBreakpoint({ smallerThan: "md" });

  const [sentryRef] = useInfiniteScroll({
    loading: posts.isLoading,
    hasNextPage: true,
    onLoadMore: posts.fetchNextPage,
    rootMargin: "0px 0px 400px 0px",
    disabled: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Container
      size={smallerThanMd ? undefined : 690}
      px={0}
      mx={largerThanSm ? undefined : "-md"}
    >
      <Stack spacing="md" ref={containerRef}>
        <DataList
          {...posts}
          itemComponent={Post}
          itemKey="post.id"
          itemProps={{ containerRef, shadow: "xs" }}
          loaderComponent={PostListLoader}
        />
        <Center ref={sentryRef} sx={{ height: 60 }}>
          {posts.isSuccess && posts.isFetching && <Loader />}
        </Center>
      </Stack>
    </Container>
  );
};
