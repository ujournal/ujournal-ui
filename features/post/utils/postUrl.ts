export const isPostUrlPlaceholder = (url: string) => {
  return url.startsWith("https://example.com");
};

export const generatePostPlaceholderUrl = () => {
  return `https://example.com/?${Math.random()}`;
};
