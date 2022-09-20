import { Box, BoxProps } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useMarkdown } from "baza/hooks/useMarkdown";
import { FC, useCallback, MouseEvent, useMemo } from "react";
import truncate from "truncate-html";

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
  const markdown = useMarkdown();
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  const handleContentClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.target.setAttribute("target", "_blank");
      }
    },
    []
  );

  const html = useMemo(() => {
    const html = markdown.render(text);

    if (truncateLength) {
      return truncate(html, truncateLength);
    }

    return html;
  }, [markdown, text, truncateLength]);

  return (
    <Box
      {...props}
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={handleContentClick}
      sx={(theme) => ({
        "& a": {
          textDecoration: "underline",
          textDecorationColor: theme.colors.blue[1],
          color: theme.colors.blue,
        },
        "p:empty": {
          display: "none",
        },
        "& > p:first-of-type": {
          marginTop: 0,
        },
        "& > p:last-child": {
          marginBottom: 0,
        },
        "& p:empty": {
          display: "none",
        },
        "& img": {
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "100%",
          maxHeight: "60vh",
        },
        "& .image": {
          backgroundColor: "rgba(0,0,0,0.05)",
          marginLeft: compact ? 0 : -20,
          marginRight: compact ? 0 : -20,
          display: compact ? "inline-block" : "block",
        },
        "& .image video": {
          display: "block",
        },
        "& .image-caption": {
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.sm,
          fontSize: 14,
          color: theme.colors.gray[6],
        },
        "& blockquote": {
          backgroundColor: theme.fn.lighten(theme.colors.blue[0], 0.5),
          padding: compact ? theme.spacing.sm : theme.spacing.xl,
          marginLeft: compact
            ? 0
            : largerThanMd
            ? -theme.spacing.lg
            : -theme.spacing.sm,
          marginRight: compact
            ? 0
            : largerThanMd
            ? -theme.spacing.lg
            : -theme.spacing.sm,
          fontSize: compact ? theme.fontSizes.md : theme.fontSizes.xl,
          fontWeight: 600,
          borderRadius: compact ? theme.radius.md : undefined,
          "& p:first-of-type": {
            marginTop: 0,
          },
          "& p:last-child": {
            marginBottom: 0,
          },
        },
        "& .embed-responsive": {
          position: "relative",
          overflow: "hidden",
          paddingTop: "56.25%",
        },
        "& .embed-responsive iframe": {
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          border: 0,
        },
      })}
    />
  );
};
