import { Box } from "@mantine/core";
import { EmbedComponentType } from "../types";

export const ImageEmbed: EmbedComponentType = ({ src, title }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <Box
      sx={{
        backgroundImage: `url("${src}")`,
        backgroundSize: "cover",
        backgroundColor: "#000",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          backdropFilter: "blur(100px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="image"
      />
    </Box>
  );
};
