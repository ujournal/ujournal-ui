import { Box } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useMarkdown } from "baza/hooks/useMarkdown";
import { FC } from "react";

export const MarkdownText: FC<{ text: string }> = ({ text }) => {
  const markdown = useMarkdown();
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: markdown.render(text) }}
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
          marginLeft: -20,
          marginRight: -20,
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
