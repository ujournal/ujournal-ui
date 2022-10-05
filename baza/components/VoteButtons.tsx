import { ActionIcon, Box, Group, Loader, Tooltip } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import { FC, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Score } from "./Score";

export const VoteButtons: FC<{
  counts: {
    score: number;
    upvotes: number;
    downvotes: number;
  };
  myVote?: number;
  vote: {
    isLoading?: boolean;
    voteUp: () => void;
    voteDown: () => void;
    voteZero: () => void;
  };
}> = ({
  counts = { score: 0, upvotes: 0, downvotes: 0 },

  myVote = 0,
  vote: { isLoading = false, voteUp, voteDown, voteZero },
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const label = useMemo(() => {
    const points =
      counts.score > 0 && counts.score < 5
        ? t("number_of_points", {
            count: counts.score,
            formattedCount: counts.score,
          })
        : t("number_of_points_plural", {
            count: counts.score,
            formattedCount: counts.score,
          });

    const upvotes =
      counts.upvotes > 0 && counts.upvotes < 5
        ? t("number_of_upvotes", {
            count: counts.upvotes,
            formattedCount: counts.upvotes,
          })
        : t("number_of_upvotes_plural", {
            count: counts.upvotes,
            formattedCount: counts.upvotes,
          });

    const downvotes =
      counts.downvotes > 0 && counts.downvotes < 5
        ? t("number_of_downvotes", {
            count: counts.downvotes,
            formattedCount: counts.downvotes,
          })
        : t("number_of_downvotes_plural", {
            count: counts.downvotes,
            formattedCount: counts.downvotes,
          });

    return `${points}, ${upvotes}, ${downvotes}`;
  }, [counts.downvotes, counts.score, counts.upvotes, t]);

  return (
    <Group noWrap align="center" spacing={2}>
      <Tooltip label={t("downvote")} disabled={myVote === -1 || isLoading}>
        <ActionIcon
          color="gray"
          variant="subtle"
          onClick={myVote === 1 ? voteZero : voteDown}
          disabled={myVote === -1 || isLoading}
        >
          <IconArrowDown stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={label}>
        <Box
          ref={ref}
          sx={(theme) => ({
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              theme.colorScheme === "light"
                ? theme.colors.gray[1]
                : theme.colors.gray[8],
            minWidth: 40,
            height: 28,
            borderRadius: theme.radius.sm,
            "& .firework": {
              position: "absolute",
              left: 20,
              top: 14,
              transform: "scale(0.2)",
            },
            "& .explosion": {
              position: "absolute",
              left: 0,
              bottom: 0,
              width: 4,
              height: 80,
              transformOrigin: "50% 100%",
              overflow: "hidden",
            },
            "& .explosion:nth-of-type(1)": {
              transform: "rotate(0deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(2)": {
              transform: "rotate(30deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(3)": {
              transform: "rotate(60deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(4)": {
              transform: "rotate(90deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(5)": {
              transform: "rotate(120deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(6)": {
              transform: "rotate(150deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(7)": {
              transform: "rotate(180deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(8)": {
              transform: "rotate(210deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(9)": {
              transform: "rotate(240deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(10)": {
              transform: "rotate(270deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(11)": {
              transform: "rotate(300deg) translateY(-15px)",
            },
            "& .explosion:nth-of-type(12)": {
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
            fontWeight: 600,
          })}
        >
          {isLoading ? (
            <Loader color="gray" size="xs" />
          ) : (
            <>
              <Score score={counts.score} />
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
            </>
          )}
        </Box>
      </Tooltip>
      <Tooltip label={t("upvote")} disabled={myVote === 1 || isLoading}>
        <ActionIcon
          color="gray"
          variant="subtle"
          onClick={myVote === -1 ? voteZero : voteUp}
          disabled={myVote === 1 || isLoading}
        >
          <IconArrowUp stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
