import { BoxProps } from "@mantine/core";
import { FC, useCallback, MouseEvent, useMemo } from "react";
import truncate from "truncate-html";
import markdown2html from "baza/utils/markdown2html/markdown2html";
import { ContentText } from "./ContentText";
import { makeMentionAsLink } from "features/mentions/utils/mentions";
import linkifyHtml from "linkify-html";
import { makeHashtagsAsLinks } from "baza/utils/hashtags";

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
  const html = useMemo(() => {
    const value = makeHashtagsAsLinks(
      makeMentionAsLink(
        linkifyHtml(markdown2html(text, { useImageCaption: true }))
      )
    );

    if (truncateLength) {
      const valueSplitted = value.split("<!--IMAGE:END-->");
      const valueImageCutted =
        valueSplitted.length > 1 ? `${valueSplitted[0]}</p>` : value;
      return truncate(valueImageCutted, truncateLength);
    }

    return value;
  }, [text, truncateLength]);

  return (
    <ContentText
      {...props}
      compact={compact}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
