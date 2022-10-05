import { Box, Center } from "@mantine/core";
import { TikTokEmbed as TikTokEmbedVendor } from "react-social-media-embed";
import { EmbedComponentType } from "../types";

export const TikTokEmbed: EmbedComponentType = ({ src }) => {
  if (src) {
    return (
      <Box
        p="sm"
        sx={(theme) => ({
          "& iframe": {
            backgroundColor:
              theme.colorScheme === "light"
                ? theme.white
                : theme.colors.gray[8],
            marginTop: "0 !important",
            marginBottom: "0 !important",
            marginLeft: "auto !important",
            marginRight: "auto !important",
          },
        })}
      >
        <Center>
          <TikTokEmbedVendor url={src} />
        </Center>
      </Box>
    );
  }

  return <Box>Incorrect URL</Box>;
};
