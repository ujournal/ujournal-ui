import { Card, Container, Stack, Title } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { formatShortNum } from "baza/utils/number";
import { FC } from "react";
import { useTranslation } from "react-i18next";
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
}> = ({ data, isLoading, showAsTree = true, compact = false }) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const list = (
    <Stack spacing={compact ? "sm" : 0}>
      <DataList
        isLoading={isLoading}
        data={
          showAsTree
            ? transformCommentsToTree(data)
            : transformCommentsFromCommentsView(data)
        }
        itemComponent={Comment}
        itemKey="comment.id"
        loaderComponent={CommentListLoader}
        itemProps={{ compact }}
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
