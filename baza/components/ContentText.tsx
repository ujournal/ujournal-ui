import { Box, BoxProps } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { FC, HTMLAttributes, useEffect, useRef } from "react";

export const ContentText: FC<
  Omit<BoxProps, "sx"> & {
    compact?: boolean;
    zoomable?: boolean;
  } & HTMLAttributes<HTMLDivElement>
> = ({ compact = false, zoomable = true, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  useEffect(() => {
    const handleImageError = (event: Event) => {
      if (event.currentTarget instanceof HTMLImageElement) {
        event.currentTarget.src = `${process.env.NEXT_PUBLIC_BASE_URL}/no-image.svg`;
        event.currentTarget.removeEventListener("error", handleImageError);
      }
    };

    if (ref.current) {
      Array.from(ref.current.querySelectorAll("img")).map((image) =>
        image.addEventListener("error", handleImageError)
      );
    }
  }, []);

  return (
    <Box
      {...props}
      ref={ref}
      className={`ContentText-root ${zoomable ? "ContentText-zoomable" : ""}`}
      sx={(theme) => ({
        "& a": {
          color: theme.colors.blue,
          wordBreak: "break-word",
        },
        "& p": {
          lineHeight: 1.8,
          wordBreak: "break-word",
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
          maxWidth: "100%",
          width: "100%",
          height: "var(--image-height)",
        },
        "& img[src^='data:']": {
          opacity: 0.5,
          animation: "flickerAnimation 1s infinite",
        },
        "& hr": {
          height: 1,
          border: "none",
          color: "#dadce0",
          backgroundColor:
            theme.colorScheme === "light"
              ? theme.colors.gray[4]
              : theme.colors.gray[7],
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
          display: "block",
          padding: theme.spacing.sm,
          textAlign: "center",
          fontSize: 14,
          color: theme.colors.gray[6],
          "&:empty": { display: "none" },
        },
        "& blockquote": {
          backgroundColor:
            theme.colorScheme === "light"
              ? theme.fn.lighten(theme.colors.blue[0], 0.5)
              : theme.colors.gray[8],
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
        "& code": {
          display: "block",
          backgroundColor: theme.colors.gray[1],
          padding: theme.spacing.sm,
          overflow: "auto",
          borderRadius: theme.radius.sm,
          fontFamily: theme.fontFamilyMonospace,
        },
      })}
    >
      {props.children}
    </Box>
  );
};
