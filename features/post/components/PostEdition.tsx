import {
  Box,
  Card,
  Container,
  Group,
  Stack,
  ThemeIcon,
  Text,
  Button,
} from "@mantine/core";
import { IconChevronDown, IconMessageCircle2 } from "@tabler/icons";
import { DataList } from "baza/components/DataList";
import { capitalize } from "baza/utils/string";
import { sub } from "date-fns";
import Link from "next/link";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ListingType, PostView, SortType } from "ujournal-lemmy-js-client";
import { usePostList } from "../hooks/usePostList";

const PostEditionItem: FC<PostView> = ({ post, counts }) => {
  return (
    <Link href={{ pathname: "/post", query: { postId: post.id } }} passHref>
      <Box component="a">
        <Box component="span">{post.name}</Box>
        <Group
          spacing={2}
          sx={{
            display: "inline-flex",
            lineHeight: 1,
            verticalAlign: "middle",
            marginLeft: 8,
            whiteSpace: "nowrap",
            fontSize: 12,
            fontWeight: "bold",
            alignItems: "center",
          }}
          noWrap
        >
          <ThemeIcon
            variant="outline"
            sx={{ border: "none" }}
            size="xs"
            color="gray"
          >
            <IconMessageCircle2 stroke={1.5} />
          </ThemeIcon>
          <Text color="gray">{counts.comments}</Text>
        </Group>
      </Box>
    </Link>
  );
};

export const PostEdition: FC = () => {
  const { t } = useTranslation();

  const postList = usePostList({
    params: {
      type: ListingType.All,
      sort: SortType.TopDay,
      limit: 10,
    },
  });

  const postEditonList = usePostList({
    params: {
      type: ListingType.All,
      sort: SortType.New,
      communityName: "edition",
      limit: 20,
    },
  });

  const postListDataFiltered = useMemo(() => {
    const posts = postList.data
      .filter(({ post }) => post.name.split(" ").length > 2)
      .filter(({ community }) => community.name !== "edition");

    const editionPosts =
      postEditonList.data.length > 0
        ? postEditonList.data.filter(
            ({ post }) =>
              sub(new Date(), { days: 2 }) < new Date(post.published)
          )
        : [];

    return [...editionPosts, ...posts];
  }, [postEditonList.data, postList.data]);

  const handleNextPage = useCallback(async () => {
    postList.fetchNextPage();
  }, [postList]);

  if (postListDataFiltered.length === 0) {
    return null;
  }

  return (
    <Container size={690} p={0} mb="md">
      <Card radius="md" withBorder={false}>
        <Stack spacing="xs">
          <DataList
            data={postListDataFiltered}
            itemComponent={PostEditionItem}
            itemKey="post.id"
          />
          <Box>
            <Button
              variant="subtle"
              styles={{
                root: {
                  padding: 0,
                  height: "auto",
                  color: "black",
                  ":hover": { backgroundColor: "transparent" },
                  display: "inline-block",
                },
                inner: { justifyContent: "flex-start" },
                rightIcon: { marginLeft: 4 },
              }}
              onClick={handleNextPage}
              loading={
                postList.isLoading ||
                postList.isFetching ||
                postEditonList.isLoading ||
                postEditonList.isFetching
              }
              color="gray"
              rightIcon={<IconChevronDown stroke={1.5} size={12} />}
            >
              {capitalize(t("more"))}
            </Button>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
};
