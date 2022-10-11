import { Box, Center } from "@mantine/core";
import { EmbedComponentType } from "../types";

export const SpotifyEmbed: EmbedComponentType = ({ src }) => {
  if (src) {
    const {
      style = {},
      width = "100%",
      height = 352,
      frameBorder = 0,
      allow = "encrypted-media",
    } = {};

    return (
      <Box
        p="sm"
        sx={(theme) => ({
          "& iframe": {
            marginTop: "0 !important",
            marginBottom: "0 !important",
            marginLeft: "auto !important",
            marginRight: "auto !important",
            backgroundColor: "transparent",
            borderRadius: theme.radius.md,
            ...style,
          },
        })}
      >
        <Center>
          <Box
            component="iframe"
            title="Spotify Web Player"
            src={`https://open.spotify.com/embed${new URL(src).pathname}`}
            sandbox="allow-scripts allow-same-origin allow-popups"
            width={width}
            height={height}
            frameBorder={frameBorder}
            allow={allow}
          />
        </Center>
      </Box>
    );
  }

  return <Box>Incorrect URL</Box>;
};
