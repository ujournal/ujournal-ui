import { Box, Center, Skeleton } from "@mantine/core";
import { useCallback } from "react";
import { useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { EmbedComponentType } from "./types";

export const TwitterEmbed: EmbedComponentType = ({ src }) => {
  const [isLoad, setLoad] = useState<boolean>(false);

  const matches = src.match(
    /(^|[^'"])(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))/
  );

  const handleLoad = useCallback(() => {
    setLoad(true);
  }, []);

  if (matches && matches.length > 0) {
    const tweetId = matches[4];

    return (
      <Box
        p="sm"
        sx={{
          "& .twitter-tweet": {
            marginTop: "0 !important",
            marginBottom: "0 !important",
            marginLeft: "auto !important",
            marginRight: "auto !important",
          },
        }}
      >
        <TwitterTweetEmbed tweetId={tweetId} onLoad={handleLoad} />
        {!isLoad && (
          <Center>
            <Skeleton
              radius="md"
              height={200}
              sx={{ maxWidth: 550, width: "100%" }}
            />
          </Center>
        )}
      </Box>
    );
  }

  return <Box>Incorrect tweetId</Box>;
};
