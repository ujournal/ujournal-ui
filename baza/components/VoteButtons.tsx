import { ActionIcon, Box, Group, Loader, Tooltip } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import { FC, useEffect, useMemo, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

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

  // useEffect(() => {
  //   if (ref.current) {
  //     const el = ref.current.querySelector<HTMLDivElement>(
  //       ".firework .explosion::before"
  //     );
  //     if (el) {
  //       el.style.animation = "explosion 2s ease-in-out 1";
  //     }
  //   }
  // }, [counts.score]);

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
            ref={ref}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 18,
              "& .firework": {
                position: "absolute",
                left: 10,
                top: 12,
                transform: "scale(0.2)",
              },
              "& .explosion": {
                position: "absolute",
                left: -2,
                bottom: 0,
                width: 4,
                height: 80,
                transformOrigin: "50% 100%",
                overflow: "hidden",
              },
              "& .explosion:nth-child(1)": {
                transform: "rotate(0deg) translateY(-15px)",
              },
              "& .explosion:nth-child(2)": {
                transform: "rotate(30deg) translateY(-15px)",
              },
              "& .explosion:nth-child(3)": {
                transform: "rotate(60deg) translateY(-15px)",
              },
              "& .explosion:nth-child(4)": {
                transform: "rotate(90deg) translateY(-15px)",
              },
              "& .explosion:nth-child(5)": {
                transform: "rotate(120deg) translateY(-15px)",
              },
              "& .explosion:nth-child(6)": {
                transform: "rotate(150deg) translateY(-15px)",
              },
              "& .explosion:nth-child(7)": {
                transform: "rotate(180deg) translateY(-15px)",
              },
              "& .explosion:nth-child(8)": {
                transform: "rotate(210deg) translateY(-15px)",
              },
              "& .explosion:nth-child(9)": {
                transform: "rotate(240deg) translateY(-15px)",
              },
              "& .explosion:nth-child(10)": {
                transform: "rotate(270deg) translateY(-15px)",
              },
              "& .explosion:nth-child(11)": {
                transform: "rotate(300deg) translateY(-15px)",
              },
              "& .explosion:nth-child(12)": {
                transform: "rotate(330deg) translateY(-15px)",
              },
              "& .explosion::before": {
                content: "''",
                position: "absolute",
                left: 0,
                right: 0,
                top: "100%",
                height: 40,
                backgroundColor: "#f5cf52",
              },
              "& .firework .explosion::before": {
                animation: "explosion 2s ease-in-out 1",
              },
            }}
          >
            {counts.score}
            <div className="firework">
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
              <div className="explosion"></div>
            </div>
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
