import { BoxProps } from "@mantine/core";
import { FC, useCallback, MouseEvent, useMemo } from "react";
import truncate from "truncate-html";
import markdown2html from "baza/utils/markdown2html/markdown2html";
import { ContentText } from "./ContentText";

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
    const html = markdown2html(text).replace(
      /\@([a-z0-9_]+)/g,
      `<a href="${process.env.NEXT_PUBLIC_BASE_URL}/user?username=$1">@$1</a>`
    );

    return html;
  }, [text]);

  return (
    <ContentText
      {...props}
      html={html}
      compact={compact}
      onClick={handleContentClick}
    />
  );
};
