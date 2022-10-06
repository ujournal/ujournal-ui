import { CommentAggregates, Post } from "ujournal-lemmy-js-client";
import { isObject, sortBy } from "lodash";

export type CommentInternal = {
  comment: {
    id: number;
    content: string;
    deleted: boolean;
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
  return sortBy(
    comments
      .map<CommentInternal | undefined>(
        ({ comment, creator, my_vote, post, counts }) =>
          comment.parent_id === parentId && !comment.deleted
            ? {
                comment: {
                  id: comment.id,
                  content: comment.content,
                  published: comment.published,
                  deleted: comment.deleted,
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
      .filter(Boolean),
    (comment) => (comment ? new Date(comment.comment.published) : undefined)
  );
};

export const transformCommentsFromCommentsView = (comments: any[]) => {
  return comments
    .filter(({ comment }) => !comment.deleted)
    .map<CommentInternal>(({ comment, creator, post, my_vote, counts }) => ({
      comment: {
        id: comment.id,
        content: comment.content,
        published: comment.published,
        deleted: comment.deleted,
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
    }));
};

export const encodeCommentContent = (content: string) => {
  return content
    .replace(/^\+(\n|$)/gm, "&plus;\n")
    .replace(
      /@([A-Za-z0-9_]+)/g,
      `[@$1@${process.env.NEXT_PUBLIC_MENTIONS_DOMAIN}](https:\/\/${process.env.NEXT_PUBLIC_MENTIONS_DOMAIN}\/u\/$1)`
    );
};

export const decodeCommentContentForEdit = (content: string) => {
  return content
    .replace(/^&plus;/gm, "+")
    .replace(
      new RegExp(
        `\\[@([A-Za-z0-9_]+)@${process.env.NEXT_PUBLIC_MENTIONS_DOMAIN.replace(
          /\./g,
          "\\."
        )}\\]\\(https:\\/\\/${process.env.NEXT_PUBLIC_MENTIONS_DOMAIN.replace(
          /\./g,
          "\\."
        )}\\/u\\/[A-Za-z0-9_]+\\)`,
        "g"
      ),
      `@$1`
    );
};

export const decodeCommentContentForRender = (content: string) => {
  return content.replace(
    new RegExp(
      `\\[@([A-Za-z0-9_]+)@${process.env.NEXT_PUBLIC_MENTIONS_DOMAIN.replace(
        /\./g,
        "\\."
      )}\\]\\(https:\\/\\/${process.env.NEXT_PUBLIC_MENTIONS_DOMAIN.replace(
        /\./g,
        "\\."
      )}\\/u\\/[A-Za-z0-9_]+\\)`,
      "g"
    ),
    `@$1`
  );
};
