import { CommentView } from "ujournal-lemmy-js-client";

export const transformCommentsToTree = (
  comments: any,
  parentId: number | null = null
): any => {
  const result = [];

  for (let commentView of comments) {
    if (commentView.comment.parent_id === parentId) {
      result.push({
        ...commentView,
        children: transformCommentsToTree(comments, commentView.comment.id),
      });
    }
  }

  return result;
};

export const transformCommentsFromCommentsView = (comments: CommentView[]) => {
  return comments.map(({ comment, creator, post }) => {
    return {
      comment: {
        id: comment.id,
        content: comment.content,
      },
      creator: {
        id: creator.id,
        display_name: creator.display_name.unwrapOr(""),
        name: creator.name,
      },
      post,
    };
  });
};
