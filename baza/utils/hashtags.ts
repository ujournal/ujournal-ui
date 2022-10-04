export const makeHashtagsAsLinks = (html: string) => {
  return html.replace(
    /#([\wа-яіїґ_]+)/gi,
    `<a href="${process.env.NEXT_PUBLIC_BASE_URL}/search/?q=%23$1">#$1</a>`
  );
};
