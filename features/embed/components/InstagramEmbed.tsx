import { Box } from "@mantine/core";
import { InstagramEmbed as InstagramEmbedVendor } from "react-social-media-embed";
import { EmbedComponentType } from "./types";

export const InstagramEmbed: EmbedComponentType = ({ src }) => {
  if (src) {
    return (
      <Box
        p="sm"
        sx={{
          "& iframe": {
            marginTop: "0 !important",
            marginBottom: "0 !important",
            marginLeft: "auto !important",
            marginRight: "auto !important",
          },
        }}
      >
        <InstagramEmbedVendor url={src} width="100%" />
      </Box>
    );
  }

  return <Box>Incorrect URL</Box>;
};
