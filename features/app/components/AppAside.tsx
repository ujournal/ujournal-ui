import { CommentList } from "features/comment/components/CommentList";
import { useCommentList } from "features/comment/hooks/useCommentList";
import { FC } from "react";

export const AppAside: FC = () => {
  const { data, isLoading } = useCommentList();

  return (
    <CommentList
      data={data?.comments || []}
      isLoading={isLoading}
      lightweight
      showAsTree={false}
    />
  );
};
