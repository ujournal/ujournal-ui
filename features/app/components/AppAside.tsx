import { Box, Stack, Title } from "@mantine/core";
import { CommentList } from "features/comment/components/CommentList";
import { useCommentList } from "features/comment/hooks/useCommentList";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CommentSortType } from "ujournal-lemmy-js-client";

export const AppAside: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useCommentList({ sort: CommentSortType.New });

  return (
    <Box p="sm">
      <Stack spacing="sm">
        <Title size="h4">{t("comments")}</Title>

        <CommentList
          data={data?.comments || []}
          isLoading={isLoading}
          compact
          showAsTree={false}
          showPost
        />
      </Stack>
    </Box>
  );
};