import { ActionIcon, Box, Group, Loader } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import { FC } from "react";

export const VoteButtons: FC<{
  count: number;
  isLoading?: boolean;
  myVote?: number;
  onVoteUp: () => void;
  onVoteDown: () => void;
}> = ({ count = 0, isLoading = false, myVote = 0, onVoteUp, onVoteDown }) => {
  return (
    <Group noWrap align="center">
      <ActionIcon
        color="blue"
        variant="subtle"
        onClick={onVoteDown}
        disabled={myVote === -1}
      >
        <IconArrowDown stroke={1.5} />
      </ActionIcon>
      {isLoading ? (
        <Loader size="xs" />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 18,
          }}
        >
          {count}
        </Box>
      )}
      <ActionIcon
        color="blue"
        variant="subtle"
        onClick={onVoteUp}
        disabled={myVote === 1}
      >
        <IconArrowUp stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};
