import { Card, Container, Stack, Title } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { formatShortNum } from "baza/utils/number";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PostAggregates } from "ujournal-lemmy-js-client";
import { buildCommentsTree } from "../utils/comments";
import { Comment } from "./Comment";
import { CommentListLoader } from "./CommentListLoader";

export const CommentList: FC<{
  isLoading: boolean;
  data: any[];
  counts?: PostAggregates;
}> = ({ counts, data, isLoading }) => {
  const { t } = useTranslation();
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  return (
    <Card radius={smallerThanSm ? 0 : "md"}>
      <Container size={650} p={0}>
        <Stack spacing="md">
          <Title size="h3" id="comments">
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
