import { Box } from "@mantine/core";
import { cleanupRateFromImageSrc, getRateFromImageSrc } from "baza/utils/image";
import { SyntheticEvent, useCallback } from "react";
import { EmbedComponentType } from "../types";

export const ImageEmbed: EmbedComponentType = ({ src, title }) => {
  // eslint-disable-next-line @next/next/no-img-element
  const handleImageError = useCallback((event: SyntheticEvent) => {
    if (event.currentTarget instanceof HTMLImageElement) {
      const element = event.currentTarget;
      const imageUrl = event.currentTarget.src;
      element.src = `${process.env.NEXT_PUBLIC_BASE_URL}/no-image.svg`;
      setTimeout(() => {
        element.src = `${imageUrl}?${Math.random()}`;
      }, 5000);
    }
  }, []);

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
        onError={handleImageError}
      />
    </Box>
  );
};
