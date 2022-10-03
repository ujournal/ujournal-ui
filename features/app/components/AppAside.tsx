import { Box, Stack, Title } from "@mantine/core";
import { CommentList } from "features/comment/components/CommentList";
import { useCommentList } from "features/comment/hooks/useCommentList";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CommentSortType } from "ujournal-lemmy-js-client";

export const AppAside: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useCommentList(
    { sort: CommentSortType.New },
    { refetchInterval: 30000 }
  );

  return (
    <Box p={4}>
      <Stack spacing="sm" mt="xs">
        <Title size="h4">{t("comments")}</Title>

        <CommentList
          data={data?.comments || []}
          isLoading={isLoading}
          compact
          showAsTree={false}
          showPost
          truncateLength={100}
          asLink
        />
      </Stack>
    </Box>
  );
};
