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
  lightweight?: boolean;
}> = ({
  counts,
  data,
  isLoading,
  showAsTree = true,
  lightweight = false,
  showPost = false,
}) => {
  const { t } = useTranslation();
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const list = (
    <Stack spacing="md">
      {lightweight ? (
        <Title size="h4">{t("comments")}</Title>
      ) : (
        <Title size="h3" id="comments">
          {t("number_of_comments", {
            count: counts?.comments || 0,
            formattedCount: formatShortNum(counts?.comments || 0),
          })}
        </Title>
      )}
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
        itemProps={{ asSmall: lightweight, showPost }}
      />
    </Stack>
  );

  return lightweight ? (
    list
  ) : (
    <Card radius={smallerThanSm ? 0 : "md"}>
      <Container size={650} p={0}>
        {list}
      </Container>
    </Card>
  );
};
