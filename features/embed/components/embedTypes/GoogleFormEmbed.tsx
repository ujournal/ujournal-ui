import { Box } from "@mantine/core";
import { EmbedComponentType } from "../types";

export const GoogleFormEmbed: EmbedComponentType = ({ src }) => {
  return (
    <Box
      component="iframe"
      src={src}
      width="100%"
      frameBorder="0"
      scrolling="yes"
      sandbox="allow-scripts allow-same-origin allow-popups"
      sx={{
        display: "block",
        overflow: "hidden",
        border: "none",
        backgroundColor: "transparent",
      }}
    />
  );
};
