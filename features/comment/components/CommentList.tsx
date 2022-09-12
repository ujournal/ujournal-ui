import { Container, Stack } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { FC, useMemo } from "react";
import { PostAggregates } from "ujournal-lemmy-js-client";
import {
  transformCommentsToTree,
  transformCommentsFromCommentsView,
} from "../utils/comments";
import { Comment, CommentProps } from "./Comment";
import { CommentListLoader } from "./CommentListLoader";

export type CommentListProps = {
  data: any[];
  counts?: PostAggregates;
  showAsTree?: boolean;
  showPost?: boolean;
  isLoading?: boolean;
} & Pick<CommentProps, "commentFormProps" | "compact" | "truncateLength">;

export const CommentList: FC<CommentListProps> = ({
  data,
  showAsTree = true,
  isLoading,
  ...commentProps
}) => {
  const commentsList = useMemo(
    () =>
      showAsTree
        ? transformCommentsToTree(data)
        : transformCommentsFromCommentsView(data),
    [data, showAsTree]
  );

  const list = (
    <Stack spacing={commentProps.compact ? "sm" : 0}>
      <DataList
        data={commentsList}
        itemComponent={Comment}
        itemKey="comment.id"
        loaderComponent={CommentListLoader}
        itemProps={commentProps}
        isLoading={isLoading}
      />
    </Stack>
  );

  return commentProps.compact ? (
    list
  ) : (
    <Container size={650} p={0}>
      {list}
    </Container>
  );
};
