import { EmbedComponentType } from "../types";

export const VideoEmbed: EmbedComponentType = ({ src }) => {
  return (
    <video controls>
      <source src={src} type="video/mp4" />
    </video>
  );
};
