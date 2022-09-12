import { formatShortNum } from "baza/utils/number";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PostAggregates } from "ujournal-lemmy-js-client";

export const CommentTitle: FC<{
  counts: PostAggregates | undefined;
  showFull?: boolean;
}> = ({ counts, showFull = false }) => {
  const { t } = useTranslation();

  if (!counts) {
    return <>{t("comments")}</>;
  }

  return (
    <>
      {counts.comments === 0
        ? t("comments")
        : counts.comments > 0 && counts.comments < 5
        ? t("number_of_comments", {
            count: counts.comments,
            formattedCount: showFull
              ? counts.comments
              : formatShortNum(counts.comments),
          })
        : t("number_of_comments_plural", {
            count: counts.comments,
            formattedCount: showFull
              ? counts.comments
              : formatShortNum(counts.comments),
          })}
    </>
  );
};
