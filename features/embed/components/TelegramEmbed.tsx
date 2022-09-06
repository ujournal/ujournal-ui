import { Box } from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EmbedComponentType } from "./types";

export const TelegramEmbed: EmbedComponentType = ({ src }) => {
  const matches = src.match(/(?:https?:\/\/www\.)?t\.me\S*?\/s\/(.+\/\d+)\/?/);
  const [height, setHeight] = useState<number | string>(80);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const frameId = useMemo(
    () => `telegram-post${new URL(src).pathname.replace(/[^a-z0-9_]/gi, "-")}`,
    [src]
  );

  const sendFrameVisibleMessage = useCallback((frameId: string) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "visible", frame: frameId }),
        "*"
      );
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      const handleIframeMessage = ({ data, source }: MessageEvent) => {
        if (
          !data ||
          typeof data !== "string" ||
          source !== iframe?.contentWindow
        ) {
          return;
        }

        const action = JSON.parse(data);

        if (action.event === "resize" && action.height) {
          setHeight(action.height);
        }
      };

      const handleIframeLoad = () => {
        sendFrameVisibleMessage(frameId);
      };

      window.addEventListener("message", handleIframeMessage);
      iframe.addEventListener("load", handleIframeLoad);

      return () => {
        if (iframe) {
          window.removeEventListener("message", handleIframeMessage);
          iframe.removeEventListener("load", handleIframeLoad);
        }
      };
    }
  }, [frameId, sendFrameVisibleMessage]);

  if (matches && matches.length > 0) {
    return (
      <Box
        p="sm"
        sx={{
          "& iframe": {
            marginTop: "0 !important",
            marginBottom: "0 !important",
            marginLeft: "auto !important",
            marginRight: "auto !important",
          },
        }}
      >
        <Box
          component="iframe"
          id={frameId}
          src={`${src}?embed=1`}
          width="100%"
          frameBorder="0"
          scrolling="no"
          sx={{
            display: "block",
            overflow: "hidden",
            border: "none",
            minWidth: 320,
            backgroundColor: "transparent",
            height,
          }}
          ref={iframeRef}
        />
      </Box>
    );
  }

  return <Box>Incorrect telegramId</Box>;
};
