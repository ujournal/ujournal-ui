import { Card, Container, Stack, Title } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { formatShortNum } from "baza/utils/number";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PostAggregates } from "ujournal-lemmy-js-client";
import { useCommentList } from "../hooks/useCommentList";
import { Comment } from "./Comment";
import { CommentListLoader } from "./CommentListLoader";

const transformCommentList = (
  data: ReturnType<typeof useCommentList>["data"]
) => {
  return data?.comments || [];
};

export const CommentList: FC<
  ReturnType<typeof useCommentList> & {
    counts?: PostAggregates;
  }
> = ({ counts, ...commentList }) => {
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
            {...commentList}
            itemComponent={Comment}
            itemKey="comment.id"
            loaderComponent={CommentListLoader}
            transform={transformCommentList}
          />
        </Stack>
      </Container>
    </Card>
  );
};
