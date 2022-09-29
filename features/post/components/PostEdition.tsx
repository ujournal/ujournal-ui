import {
  Box,
  Card,
  Container,
  Group,
  Stack,
  ThemeIcon,
  Text,
  Button,
  Loader,
} from "@mantine/core";
import { IconMessageCircle2 } from "@tabler/icons";
import { DataList } from "baza/components/DataList";
import { capitalize } from "baza/utils/string";
import Link from "next/link";
import { FC, useMemo } from "react";
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

  const postListDataFiltered = useMemo(
    () => postList.data.filter((item) => item.post.name !== "..."),
    [postList.data]
  );

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
          <Button
            variant="subtle"
            styles={{
              root: {
                padding: 0,
                height: "auto",
                color: "black",
                ":hover": { backgroundColor: "transparent" },
              },
              inner: { justifyContent: "flex-start" },
            }}
            onClick={() => postList.fetchNextPage()}
            loading={postList.isLoading || postList.isFetching}
            color="gray"
          >
            {capitalize(t("more"))}
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};
