import { CommentAggregates, Post } from "ujournal-lemmy-js-client";
import { isObject } from "lodash";

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
                display_name: isObject(creator.display_name)
                  ? (creator.display_name as any).unwrapOr("")
                  : creator.display_name,
                name: creator.name,
                avatar: isObject(creator.avatar)
                  ? (creator.avatar as any).unwrapOr("")
                  : creator.avatar,
              },
              my_vote: isObject(my_vote)
                ? (my_vote as any).unwrapOr(0)
                : my_vote,
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
        display_name: isObject(creator.display_name)
          ? (creator.display_name as any).unwrapOr("")
          : creator.display_name,
        name: creator.name,
        avatar: isObject(creator.avatar)
          ? (creator.avatar as any).unwrapOr("")
          : creator.avatar,
      },
      my_vote: isObject(my_vote) ? (my_vote as any).unwrapOr(0) : my_vote,
      counts,
      post,
      children: [],
    })
  );
};
