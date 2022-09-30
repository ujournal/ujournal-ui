import { BoxProps } from "@mantine/core";
import { FC, useCallback, MouseEvent, useMemo } from "react";
import truncate from "truncate-html";
import markdown2html from "baza/utils/markdown2html/markdown2html";
import { ContentText } from "./ContentText";
import { makeMentionAsLink } from "features/mentions/utils/mentions";
import linkifyHtml from "linkify-html";

export const MarkdownText: FC<
  Omit<BoxProps, "sx"> & {
    text: string;
    withContentMargins?: boolean;
    truncateLength?: number;
    compact?: boolean;
  }
> = ({
  text,
  withContentMargins = true,
  truncateLength,
  compact = false,
  ...props
}) => {
  const handleContentClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.target.setAttribute("target", "_blank");
      }
    },
    []
  );

  const html = useMemo(() => {
    const html = makeMentionAsLink(
      linkifyHtml(markdown2html(text, { useImageCaption: true }))
    );

    if (truncateLength) {
      return truncate(html, truncateLength);
    }

    return html;
  }, [text, truncateLength]);

  return (
    <ContentText
      {...props}
      html={html}
      compact={compact}
      onClick={handleContentClick}
    />
  );
};
