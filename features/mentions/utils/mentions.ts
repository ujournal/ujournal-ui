export const makeMentionAsLink = (text: string) => {
  return text.replace(
    /\@([a-z0-9_]+)/g,
    `<a href="${process.env.NEXT_PUBLIC_BASE_URL}/user?username=$1">@$1</a>`
  );
};
