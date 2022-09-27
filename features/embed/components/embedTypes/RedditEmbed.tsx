import { useEffect, useRef } from "react";
import { EmbedComponentType } from "../types";

export const RedditEmbed: EmbedComponentType = ({ src }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const matches = src.match(
    /^(?:https?:\/\/(?:www\.)?)reddit\.com\/(.+?)(?:(\?.+)?)$/
  );

  useEffect(() => {
    const handleResizeEvent = (event: MessageEvent) => {
      let data = null;

      try {
        data = JSON.parse(event.data);
      } catch {}

      if (
        data?.type === "resize.embed" &&
        iframeRef.current &&
        event.source &&
        (event.source as any).window === iframeRef.current.contentWindow
      ) {
        iframeRef.current.style.height = `${data.data}px`;
      }
    };

    window.addEventListener("message", handleResizeEvent);

    return () => {
      window.addEventListener("message", handleResizeEvent);
    };
  }, []);

  if (matches && matches.length > 0) {
    return (
      <iframe
        ref={iframeRef}
        src={`https://www.redditmedia.com/${matches[1]}?embed=true`}
        sandbox="allow-scripts allow-same-origin allow-popups"
        style={{ border: "none", display: "block" }}
        height="528"
        width="100%"
        scrolling="no"
      />
    );
  }

  return null;
};
