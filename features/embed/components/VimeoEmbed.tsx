import { EmbedComponentType } from "./types";
import Vimeo from "@u-wave/react-vimeo";
import { useCallback, useMemo, useState } from "react";
import { Box, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons";

const vimeoUrlRegExp =
  /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;

export const VimeoEmbed: EmbedComponentType = ({ src, title }) => {
  const [showed, setShowed] = useState(false);
  const videoId = useMemo(() => {
    const mathes = src.match(vimeoUrlRegExp);

    if (mathes && mathes.length > 0) {
      return mathes[1];
    }

    return undefined;
  }, [src]);

  const toggleShowed = useCallback(() => {
    setShowed((showed) => !showed);
  }, []);

  if (!showed) {
    return (
      <UnstyledButton
        onClick={toggleShowed}
        sx={{ position: "relative", userSelect: "none" }}
      >
        <Box
          component="img"
          src={`https://vumbnail.com/${videoId}.jpg`}
          alt={title}
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
        <ThemeIcon
          sx={{
            position: "absolute",
            top: "auto",
            bottom: "auto",
            left: "auto",
            right: "auto",
          }}
          radius="xl"
          size="xl"
        >
          <IconPlayerPlay stroke={1.5} />
        </ThemeIcon>
      </UnstyledButton>
    );
  }

  if (videoId) {
    return (
      <Box sx={{ "& > *": { width: "100%", height: "100%" } }}>
        <Vimeo video={videoId} autoplay responsive />
      </Box>
    );
  }

  return <Box>Incorrect videoId</Box>;
};
