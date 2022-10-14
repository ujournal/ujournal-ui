export const makeMentionAsLink = (text: string) => {
  return text.replace(
    /(^|\s)\@([a-z0-9_]+)/gim,
    `<a href="${process.env.NEXT_PUBLIC_BASE_URL}/user?username=$1">@$1</a>`
  );
};
