import { Box, BoxProps, Sx, useMantineTheme } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import {
  FC,
  HTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
} from "react";
import { merge } from "lodash";

export const ContentText: FC<
  BoxProps & {
    compact?: boolean;
    zoomable?: boolean;
  } & HTMLAttributes<HTMLDivElement>
> = ({ compact = false, zoomable = true, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const largerThanMd = useBreakpoint({ largerThan: "md" });
  const theme = useMantineTheme();

  useEffect(() => {
    const handleImageError = (event: Event) => {
      if (event.currentTarget instanceof HTMLImageElement) {
        const element = event.currentTarget;
        const imageUrl = event.currentTarget.src;
        event.currentTarget.src = `${process.env.NEXT_PUBLIC_BASE_URL}/no_image.svg`;
        event.currentTarget.removeEventListener("error", handleImageError);
      }
    };

    if (ref.current) {
      Array.from(ref.current.querySelectorAll("img")).map((image) =>
        image.addEventListener("error", handleImageError)
      );
    }
  }, []);

  const handleContentClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (
        event.target instanceof HTMLAnchorElement &&
        !event.target.href.includes("/search/?q=")
      ) {
        event.target.setAttribute("target", "_blank");
      }
    },
    []
  );

  const sx = merge(
    ((theme) => ({
      "& a": {
        color:
          theme.colorScheme === "light"
            ? theme.colors.blue[7]
            : theme.colors.blue[5],
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
        display: "inline-block",
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        backgroundColor:
          theme.colorScheme === "light"
            ? theme.colors.gray[1]
            : theme.colors.gray[8],
      },
      "& pre code": {
        display: "block",
        padding: theme.spacing.sm,
        overflow: "auto",
        fontFamily: theme.fontFamilyMonospace,
      },
    }))(theme),
    props.sx instanceof Function ? props.sx(theme) : props.sx
  );

  return (
    <Box
      {...props}
      onClick={handleContentClick}
      ref={ref}
      className={`ContentText-root ${zoomable ? "zoomable" : ""}`}
      sx={sx}
    >
      {props.children}
    </Box>
  );
};
