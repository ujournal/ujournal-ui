import { Box, Center } from "@mantine/core";
import { EmbedComponentType } from "../types";

export const SoundCloudEmbed: EmbedComponentType = ({ src: url }) => {
  if (url) {
    const width = "100%";
    const height = "450px";
    const autoPlay = false;
    const hideRelated = false;
    const showComments = false;
    const showUser = true;
    const showReposts = false;
    const visual = true;
    const color = "ff5500";

    const src = visual
      ? `https://w.soundcloud.com/player/?url=${url}&amp;auto_play=${autoPlay}&amp;hide_related=${hideRelated}&amp;show_comments=${showComments}&amp;show_user=${showUser}&amp;show_reposts=${showReposts}&amp;visual=${visual}`
      : `https://w.soundcloud.com/player/?url=${url}&amp;color=${color}&amp;auto_play=${autoPlay}&amp;hide_related=${hideRelated}&amp;show_comments=${showComments}&amp;show_user=${showUser}&amp;show_reposts=${showReposts}`;

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
          <Box
            component="iframe"
            width={width}
            height={visual ? height : "auto"}
            frameBorder="0"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-popups"
            sx={{
              display: "block",
              overflow: "hidden",
              border: "none",
              minWidth: 320,
            }}
            src={src}
          />
        </Center>
      </Box>
    );
  }

  return <Box>Incorrect URL</Box>;
};
