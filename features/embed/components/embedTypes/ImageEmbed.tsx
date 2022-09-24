import { Box } from "@mantine/core";
import { EmbedComponentType } from "../types";

export const ImageEmbed: EmbedComponentType = ({ src, title }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
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
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          border: "8px solid transparent",
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
        className="image"
      />
    </Box>
  );
};
