export const makeHashtagsAsLinks = (html: string) => {
  return html.replace(
    /(^|\s|>)#([\wа-яєіїґ_]{2,})/gim,
    `$1<a href="${process.env.NEXT_PUBLIC_BASE_URL}/search/?q=%23$2">#$2</a>`
  );
};
