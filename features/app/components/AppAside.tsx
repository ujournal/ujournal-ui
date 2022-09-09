import { Box } from "@mantine/core";
import { CommentList } from "features/comment/components/CommentList";
import { useCommentList } from "features/comment/hooks/useCommentList";
import { FC } from "react";
import { CommentSortType } from "ujournal-lemmy-js-client";

export const AppAside: FC = () => {
  const { data, isLoading } = useCommentList({ sort: CommentSortType.New });

  return (
    <Box p="sm">
      <CommentList
        data={data?.comments || []}
        isLoading={isLoading}
        lightweight
        showAsTree={false}
        showPost
      />
    </Box>
  );
};
