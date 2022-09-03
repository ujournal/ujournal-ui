import { Box } from "@mantine/core";
import { EmbedComponentType } from "./types";

export const ImageEmbed: EmbedComponentType = ({ src, title }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <Box
      sx={{
        // position: "relative",
        backgroundImage: `url("${src}")`,
        backgroundSize: "cover",
        backgroundColor: "#000",
        // "&:before": {
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: "100%",
        //   height: "100%",
        //   display: "block",
        //   content: "''",
        //   backdropFilter: "blur(100px)",
        //   backgroundColor: "rgba(0, 0, 0, 0.5)",
        // },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={title}
        sx={{
          // position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          backdropFilter: "blur(100px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
    </Box>
  );
};
