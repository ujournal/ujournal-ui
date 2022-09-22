import { EmbedComponentType } from "../types";

export const RedditEmbed: EmbedComponentType = ({ src }) => {
  const matches = src.match(
    /^(?:https?:\/\/(?:www\.)?)reddit\.com\/(.+?)(?:(\?.+)?)$/
  );

  if (matches && matches.length > 0) {
    return (
      <iframe
        src={`https://www.redditmedia.com/${matches[1]}?embed=true`}
        sandbox="allow-scripts allow-same-origin allow-popups"
        style={{ border: "none" }}
        height="528"
        width="640"
        scrolling="no"
      />
    );
  }

  return null;
};
