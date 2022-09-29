import { Box, BoxProps } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { FC, HTMLAttributes } from "react";

export const ContentText: FC<
  BoxProps & {
    html?: string;
    compact?: boolean;
  } & HTMLAttributes<HTMLDivElement>
> = ({ html, compact = false, ...props }) => {
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  return (
    <Box
      {...props}
      dangerouslySetInnerHTML={html ? { __html: html } : undefined}
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
          width: "100%",
          height: "var(--image-height, 100%)",
        },
        "& img[src^='data:']": {
          opacity: 0.5,
          animation: "flickerAnimation 1s infinite",
        },
        "& hr": {
          height: 1,
          border: "none",
          color: "#dadce0",
          backgroundColor: "#dadce0",
        },
        "& .image": {
          backgroundColor: "rgba(0,0,0,0.025)",
          marginLeft: compact ? 0 : -20,
          marginRight: compact ? 0 : -20,
          display: "block",
        },
        "& .image video": {
          display: "block",
        },
        "& .image-caption": {
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.sm,
          fontSize: 14,
          color: theme.colors.gray[6],
          "&:empty": { display: "none" },
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
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          border: `1px solid ${theme.colors.gray[5]}`,
        },
        "& table td, & table th": {
          border: `1px solid ${theme.colors.gray[5]}`,
          padding: "0.5rem",
          textAlign: "center",
        },
        "& table th": {
          backgroundColor: `${theme.colors.gray[1]}`,
        },
      })}
    >
      {props.children}
    </Box>
  );
};
