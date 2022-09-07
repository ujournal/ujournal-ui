import { Box, Center } from "@mantine/core";
import { EmbedComponentType } from "./types";

export const SpotifyEmbed: EmbedComponentType = ({ src }) => {
  if (src) {
    const {
      style = {},
      width = "100%",
      height = 380,
      frameBorder = 0,
      allow = "encrypted-media",
    } = {};

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
          <iframe
            title="Spotify Web Player"
            src={`https://open.spotify.com/embed${new URL(src).pathname}`}
            width={width}
            height={height}
            frameBorder={frameBorder}
            allow={allow}
            style={{
              borderRadius: 8,
              ...style,
            }}
          />
        </Center>
      </Box>
    );
  }

  return <Box>Incorrect URL</Box>;
};
