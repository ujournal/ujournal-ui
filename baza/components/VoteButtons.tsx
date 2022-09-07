import { ActionIcon, Box, Group, Loader, Tooltip } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const VoteButtons: FC<{
  counts: {
    score: number;
    upvotes: number;
    downvotes: number;
  };
  isLoading?: boolean;
  myVote?: number;
  onVoteUp: () => void;
  onVoteDown: () => void;
}> = ({
  counts = { score: 0, upvotes: 0, downvotes: 0 },
  isLoading = false,
  myVote = 0,
  onVoteUp,
  onVoteDown,
}) => {
  const { t } = useTranslation();

  const label = useMemo(() => {
    const points = t("number_of_points", {
      count: counts.score,
      formattedCount: counts.score,
    });

    const upvotes = t("number_of_upvotes", {
      count: counts.upvotes,
      formattedCount: counts.upvotes,
    });

    const downvotes = t("number_of_downvotes", {
      count: counts.downvotes,
      formattedCount: counts.downvotes,
    });

    return `${points} • ${upvotes} • ${downvotes}`;
  }, [counts.downvotes, counts.score, counts.upvotes, t]);

  return (
    <Group noWrap align="center">
      <Tooltip label={t("downvote")}>
        <ActionIcon
          color="blue"
          variant="subtle"
          onClick={onVoteDown}
          disabled={myVote === -1}
        >
          <IconArrowDown stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      {isLoading ? (
        <Loader size="xs" />
      ) : (
        <Tooltip label={label}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 18,
            }}
          >
            {counts.score}
          </Box>
        </Tooltip>
      )}
      <Tooltip label={t("upvote")}>
        <ActionIcon
          color="blue"
          variant="subtle"
          onClick={onVoteUp}
          disabled={myVote === 1}
        >
          <IconArrowUp stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
