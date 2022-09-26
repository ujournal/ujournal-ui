import { Box } from "@mantine/core";
import { EmbedComponentType } from "../types";

export const ImageEmbed: EmbedComponentType = ({ src, title }) => {
  // eslint-disable-next-line @next/next/no-img-element

  const matches = src.match(/\#r=([\d\.]+)$/);
  const [, ratio] = matches || [-1, 1];

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Box
        component="img"
        src={src.replace(/\#r=([\d\.]+)$/, "")}
        alt={title}
        sx={{
          width: "100%",
          height: `${100 * Number(ratio)}%`,
          objectFit: "contain",
          backgroundColor: "rgba(0, 0, 0, 0.025)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
          borderRight: "1px solid rgba(255, 255, 255, 0.5)",
        }}
        className="image"
      />
    </Box>
  );
};
