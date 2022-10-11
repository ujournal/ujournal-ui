import { Box } from "@mantine/core";
import { cleanupRateFromImageSrc, getRateFromImageSrc } from "baza/utils/image";
import { EmbedComponentType } from "../types";

export const ImageEmbed: EmbedComponentType = ({ src, title }) => {
  // eslint-disable-next-line @next/next/no-img-element

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "light" ? theme.white : theme.colors.gray[8],
      })}
      className="zoomable image"
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
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </Box>
  );
};
