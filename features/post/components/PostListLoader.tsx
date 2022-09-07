import { FC } from "react";
import { PostLoader } from "./PostLoader";

export const PostListLoader: FC = () => {
  return (
    <>
      {Array.from(Array(5).keys()).map((key) => (
        <PostLoader key={key} />
      ))}
    </>
  );
};
