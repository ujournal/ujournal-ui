import { Box, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import YouTube from "react-youtube";
import { EmbedComponentType } from "./types";

const youtubeUrlRegExp =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

export const YouTubeEmbed: EmbedComponentType = ({ src, title }) => {
  const [showed, setShowed] = useState(false);
  const videoId = useMemo(() => {
    const mathes = src.match(youtubeUrlRegExp);

    if (mathes && mathes.length > 0) {
      return mathes[2];
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
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
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
      <YouTube
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
        }}
      />
    );
  }

  return <Box>Incorrect videoId</Box>;
};
