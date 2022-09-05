import { AspectRatio, Box } from "@mantine/core";
import { isMedia } from "baza/utils/url";
import { UrlEmbed } from "./UrlEmbed";
import { ImageEmbed } from "./ImageEmbed";
import { TwitterEmbed } from "./TwitterEmbed";
import { EmbedComponentType } from "./types";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { VimeoEmbed } from "./VimeoEmbed";

enum EmbedType {
  Default = "default",
  Image = "image",
  YouTube = "youtube",
  Twitter = "twitter",
  Vimeo = "vimeo",
}

const typeToCheckFn = {
  [EmbedType.Default]: () => false,
  [EmbedType.Image]: (url: string) => isMedia("image", url),
  [EmbedType.YouTube]: (url: string) => isMedia("youtube", url),
  [EmbedType.Twitter]: (url: string) => isMedia("twitter", url),
  [EmbedType.Vimeo]: (url: string) => isMedia("vimeo", url),
};

const typeToSpecificEmbedComponent = {
  [EmbedType.Default]: UrlEmbed,
  [EmbedType.Image]: ImageEmbed,
  [EmbedType.YouTube]: YouTubeEmbed,
  [EmbedType.Twitter]: TwitterEmbed,
  [EmbedType.Vimeo]: VimeoEmbed,
};

const typeToAspectRatio = {
  [EmbedType.Default]: -1,
  [EmbedType.Image]: 4 / 3,
  [EmbedType.YouTube]: 16 / 9,
  [EmbedType.Twitter]: -1,
  [EmbedType.Vimeo]: 16 / 9,
};

export const getTypeBySrc = (src: string) => {
  const types = Object.keys(typeToCheckFn) as EmbedType[];
  return types.find((type) => typeToCheckFn[type](src));
};

export const Embed: EmbedComponentType = ({
  src,
  title = "Untitled",
  description,
  thumbnail,
}) => {
  const _type = getTypeBySrc(src) || EmbedType.Default;
  const SpecificEmbedComponent =
    typeToSpecificEmbedComponent[_type] ||
    typeToSpecificEmbedComponent[EmbedType.Default];
  const aspectRatio =
    typeToAspectRatio[_type] || typeToAspectRatio[EmbedType.Default];

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.fn.rgba(theme.colors.blue[0], 0.5),
      })}
    >
      {aspectRatio === -1 ? (
        <Box>
          <SpecificEmbedComponent
            src={src}
            title={title}
            description={description}
            thumbnail={thumbnail}
          />
        </Box>
      ) : (
        <AspectRatio ratio={aspectRatio}>
          <SpecificEmbedComponent
            src={src}
            title={title}
            description={description}
            thumbnail={thumbnail}
          />
        </AspectRatio>
      )}
    </Box>
  );
};
