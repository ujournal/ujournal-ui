import { Box } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useMarkdown } from "baza/hooks/useMarkdown";
import { FC, useCallback, MouseEvent } from "react";

export const MarkdownText: FC<{
  text: string;
  withContentMargins?: boolean;
}> = ({ text, withContentMargins = true }) => {
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

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: markdown.render(text) }}
      onClick={handleContentClick}
      sx={(theme) => ({
        "& a": {
          textDecoration: "underline",
          textDecorationColor: theme.colors.blue[1],
          color: theme.colors.blue,
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
          marginLeft: withContentMargins ? -20 : undefined,
          marginRight: withContentMargins ? -20 : undefined,
        },
        "& blockquote": {
          backgroundColor: theme.colors.blue[0],
          padding: theme.spacing.xl,
          marginLeft: largerThanMd ? -theme.spacing.lg : -theme.spacing.sm,
          marginRight: largerThanMd ? -theme.spacing.lg : -theme.spacing.sm,
          fontSize: theme.fontSizes.xl,
          fontWeight: 600,
          "& p:first-of-type": {
            marginTop: 0,
          },
          "& p:last-child": {
            marginBottom: 0,
          },
        },
      })}
    />
  );
};
