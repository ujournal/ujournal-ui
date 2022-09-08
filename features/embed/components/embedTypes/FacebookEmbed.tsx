import { Box, Center } from "@mantine/core";
import { FacebookEmbed as FacebookEmbedVendor } from "react-social-media-embed";
import { EmbedComponentType } from "../types";

export const FacebookEmbed: EmbedComponentType = ({ src }) => {
  if (src) {
    return (
      <Box
        p="sm"
        sx={{
          "& iframe": {
            backgroundColor: "#fff",
            marginTop: "0 !important",
            marginBottom: "0 !important",
            marginLeft: "auto !important",
            marginRight: "auto !important",
          },
        }}
      >
        <Center>
          <FacebookEmbedVendor url={src} width={552} />
        </Center>
      </Box>
    );
  }

  return <Box>Incorrect URL</Box>;
};
