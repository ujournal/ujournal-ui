import { Box } from "@mantine/core";
import { cleanupRateFromImageSrc, getRateFromImageSrc } from "baza/utils/image";
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
        src={cleanupRateFromImageSrc(src)}
        alt={title}
        sx={{
          width: "100%",
          height: `${100 * getRateFromImageSrc(src)}%`,
          objectFit: "contain",
          backgroundColor: "rgba(0, 0, 0, 0.025)",
        }}
        className="image"
      />
    </Box>
  );
};
