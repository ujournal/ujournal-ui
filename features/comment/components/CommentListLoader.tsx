import { Skeleton, Stack } from "@mantine/core";
import { FC } from "react";

export const CommentListLoader: FC = () => {
  return (
    <Stack spacing="sm">
      {Array.from(Array(3).keys()).map((key) => (
        <Skeleton height={40} key={key} />
      ))}
    </Stack>
  );
};
