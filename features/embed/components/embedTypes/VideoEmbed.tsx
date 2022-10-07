import { Box } from "@mantine/core";
import { EmbedComponentType } from "../types";

export const VideoEmbed: EmbedComponentType = ({ src }) => {
  return (
    <Box component="video" controls sx={{ objectFit: "contain" }}>
      <Box component="source" src={src} type="video/mp4" />
    </Box>
  );
};
