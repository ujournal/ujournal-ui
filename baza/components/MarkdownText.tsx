import { Box, BoxProps } from "@mantine/core";
import { FC, useMemo, useEffect, useRef } from "react";
import truncate from "truncate-html";
import markdown2html from "baza/utils/markdown2html/markdown2html";
import { ContentText } from "./ContentText";
import { makeMentionAsLink } from "features/mentions/utils/mentions";
import linkifyHtml from "linkify-html";
import { makeHashtagsAsLinks } from "baza/utils/hashtags";
import { render } from "react-dom";
import { Embed } from "features/embed/components/Embed";

export const MarkdownText: FC<
  BoxProps & {
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
  const rootRef = useRef<HTMLDivElement>(null);

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
      const valueSplitted2 = valueImageCutted.split("embed</a>");
      const valueImageCutted2 =
        valueSplitted2.length > 1
          ? `${valueSplitted2[0]}embed</a></p>`
          : valueImageCutted;
      return truncate(valueImageCutted2, truncateLength);
    }

    return value;
  }, [text, truncateLength]);

  useEffect(() => {
    if (rootRef.current) {
      const links = rootRef.current.querySelectorAll("a");
      links.forEach((link) => {
        if (link.textContent === "embed") {
          const div = window.document.createElement("div");
          link.parentNode?.replaceChild(div, link);
          render(<Embed src={link.href} />, div);
        }
      });
    }
  }, [rootRef, text]);

  return (
    <Box ref={rootRef}>
      <ContentText
        {...props}
        compact={compact}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  );
};
