import { Container, Stack } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { FC, useMemo } from "react";
import { PostAggregates } from "ujournal-lemmy-js-client";
import {
  transformCommentsToTree,
  transformCommentsFromCommentsView,
} from "../utils/comments";
import { Comment } from "./Comment";
import { CommentListLoader } from "./CommentListLoader";

export const CommentList: FC<{
  isLoading: boolean;
  data: any[];
  counts?: PostAggregates;
  showAsTree?: boolean;
  showPost?: boolean;
  compact?: boolean;
  truncateLength?: number;
}> = ({
  data,
  isLoading,
  showAsTree = true,
  compact = false,
  truncateLength,
}) => {
  const commentsList = useMemo(
    () =>
      showAsTree
        ? transformCommentsToTree(data)
        : transformCommentsFromCommentsView(data),
    [data, showAsTree]
  );

  const list = (
    <Stack spacing={compact ? "sm" : 0}>
      <DataList
        isLoading={isLoading}
        data={commentsList}
        itemComponent={Comment}
        itemKey="comment.id"
        loaderComponent={CommentListLoader}
        itemProps={{ compact, truncateLength }}
      />
    </Stack>
  );

  return compact ? (
    list
  ) : (
    <Container size={650} p={0}>
      {list}
    </Container>
  );
};
