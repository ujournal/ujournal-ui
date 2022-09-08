export const buildCommentsTree = (
  comments: any,
  parentId: number | null = null
): any => {
  const result = [];

  for (let commentView of comments) {
    if (commentView.comment.parent_id === parentId) {
      result.push({
        ...commentView,
        children: buildCommentsTree(comments, commentView.comment.id),
      });
    }
  }

  return result;
};
