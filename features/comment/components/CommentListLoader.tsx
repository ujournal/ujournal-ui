import { Skeleton } from "@mantine/core";
import { FC } from "react";

export const CommentListLoader: FC = () => {
  return (
    <>
      {Array.from(Array(3).keys()).map((key) => (
        <Skeleton height={40} key={key} />
      ))}
    </>
  );
};
