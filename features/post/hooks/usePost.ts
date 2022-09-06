import { useQuery } from "@tanstack/react-query";

export const usePost = ({ postId }: { postId: number }) => {
  return useQuery(["post", postId], async () => {
    //
  });
};
