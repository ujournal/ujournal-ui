import { CommentAggregates, CommentView, Post } from "ujournal-lemmy-js-client";
import { Some } from "@sniptt/monads";

export type CommentInternal = {
  comment: {
    id: number;
    content: string;
    published: string;
  };
  creator: {
    id: number;
    display_name: string;
    name: string;
    avatar: string;
  };
  post: Post;
  my_vote: number;
  counts: CommentAggregates;
  children: CommentInternal[];
};

export const transformCommentsToTree = (
  comments: any[],
  parentId: number | null = null
): any => {
  return comments
    .map<CommentInternal | undefined>(
      ({ comment, creator, my_vote, post, counts }) =>
        comment.parent_id === parentId
          ? {
              comment: {
                id: comment.id,
                content: comment.content,
                published: comment.published,
              },
              creator: {
                id: creator.id,
                display_name:
                  "type" in creator.display_name
                    ? creator.display_name.unwrapOr("")
                    : creator.display_name,
                name: creator.name,
                avatar:
                  "type" in creator.avatar
                    ? Some(creator.avatar).unwrapOr("")
                    : creator.avatar,
              },
              my_vote: "type" in my_vote ? Some(my_vote).unwrapOr(0) : my_vote,
              post,
              counts,
              children: transformCommentsToTree(comments, comment.id),
            }
          : undefined
    )
    .filter(Boolean);
};

export const transformCommentsFromCommentsView = (comments: any[]) => {
  return comments.map<CommentInternal>(
    ({ comment, creator, post, my_vote, counts }) => ({
      comment: {
        id: comment.id,
        content: comment.content,
        published: comment.published,
      },
      creator: {
        id: creator.id,
        display_name:
          "type" in creator.display_name
            ? creator.display_name.unwrapOr("")
            : creator.display_name,
        name: creator.name,
        avatar:
          "type" in creator.avatar
            ? Some(creator.avatar).unwrapOr("")
            : creator.avatar,
      },
      my_vote: "type" in my_vote ? Some(my_vote).unwrapOr(0) : my_vote,
      counts,
      post,
      children: [],
    })
  );
};
