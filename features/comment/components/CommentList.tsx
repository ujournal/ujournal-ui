import { Card, Container, Stack, Title } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { formatShortNum } from "baza/utils/number";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CommentView, PostAggregates } from "ujournal-lemmy-js-client";
import { buildCommentsTree } from "../utils/comments";
import { Comment } from "./Comment";
import { CommentListLoader } from "./CommentListLoader";

export const CommentList: FC<{
  isLoading: boolean;
  data: any[];
  counts?: PostAggregates;
}> = ({ counts, data, isLoading }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Container size={650} p={0}>
        <Stack>
          <Title size="h3">
            {t("number_of_comments", {
              count: counts?.comments || 0,
              formattedCount: formatShortNum(counts?.comments || 0),
            })}
          </Title>
          <DataList
            isLoading={isLoading}
            data={buildCommentsTree(data)}
            itemComponent={Comment}
            itemKey="comment.id"
            loaderComponent={CommentListLoader}
          />
        </Stack>
      </Container>
    </Card>
  );
};
