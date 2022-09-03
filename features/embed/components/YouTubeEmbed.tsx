import { useMemo } from "react";
import YouTube from "react-youtube";
import { EmbedComponentType } from "./types";

const youtubeUrlRegExp =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

export const YouTubeEmbed: EmbedComponentType = ({ src, title }) => {
  const videoId = useMemo(() => {
    const mathes = src.match(youtubeUrlRegExp);

    if (mathes && mathes[2].length > 0) {
      return mathes[2];
    }

    return undefined;
  }, [src]);

  return <YouTube videoId={videoId} opts={{ width: "100%", height: "100%" }} />;
};
