import { AspectRatio, Box, Center } from "@mantine/core";
import { isSocialMediaUrl } from "baza/utils/social-medias";
import { UrlEmbed } from "./UrlEmbed";
import { ImageEmbed } from "./ImageEmbed";
import { TwitterEmbed } from "./TwitterEmbed";
import { EmbedComponentType } from "./types";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { VimeoEmbed } from "./VimeoEmbed";
import { FacebookEmbed } from "./FacebookEmbed";
import { InstagramEmbed } from "./InstagramEmbed";
import { TelegramEmbed } from "./TelegramEmbed";
import isUrl from "validator/lib/isURL";

enum EmbedType {
  Default = "default",
  Image = "image",
  YouTube = "youtube",
  Twitter = "twitter",
  Vimeo = "vimeo",
  Facebook = "facebook",
  Instagram = "instagram",
  Telegram = "telegram",
}

const typeToCheckFn = {
  [EmbedType.Default]: () => false,
  [EmbedType.Image]: (url: string) => isSocialMediaUrl("image", url),
  [EmbedType.YouTube]: (url: string) => isSocialMediaUrl("youtube", url),
  [EmbedType.Twitter]: (url: string) => isSocialMediaUrl("twitter", url),
  [EmbedType.Vimeo]: (url: string) => isSocialMediaUrl("vimeo", url),
  [EmbedType.Facebook]: (url: string) => isSocialMediaUrl("facebook", url),
  [EmbedType.Instagram]: (url: string) => isSocialMediaUrl("instagram", url),
  [EmbedType.Telegram]: (url: string) => isSocialMediaUrl("telegram", url),
};

const typeToSpecificEmbedComponent = {
  [EmbedType.Default]: UrlEmbed,
  [EmbedType.Image]: ImageEmbed,
  [EmbedType.YouTube]: YouTubeEmbed,
  [EmbedType.Twitter]: TwitterEmbed,
  [EmbedType.Vimeo]: VimeoEmbed,
  [EmbedType.Facebook]: FacebookEmbed,
  [EmbedType.Instagram]: InstagramEmbed,
  [EmbedType.Telegram]: TelegramEmbed,
};

const typeToAspectRatio = {
  [EmbedType.Default]: -1,
  [EmbedType.Image]: 4 / 3,
  [EmbedType.YouTube]: 16 / 9,
  [EmbedType.Twitter]: -1,
  [EmbedType.Vimeo]: 16 / 9,
  [EmbedType.Facebook]: -1,
  [EmbedType.Instagram]: -1,
  [EmbedType.Telegram]: -1,
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
  if (!isUrl(src)) {
    return (
      <Box
        sx={(theme) => ({
          backgroundColor: theme.fn.rgba(theme.colors.blue[0], 0.5),
          padding: theme.spacing.md,
        })}
      >
        <Center>Invalid URL</Center>
      </Box>
    );
  }

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
