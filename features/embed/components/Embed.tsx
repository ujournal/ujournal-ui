import { AspectRatio, Box, Center } from "@mantine/core";
import { isMediaUrl } from "baza/utils/media";
import { UrlEmbed } from "./embedTypes/UrlEmbed";
import { ImageEmbed } from "./embedTypes/ImageEmbed";
import { TwitterEmbed } from "./embedTypes/TwitterEmbed";
import { YouTubeEmbed } from "./embedTypes/YouTubeEmbed";
import { VimeoEmbed } from "./embedTypes/VimeoEmbed";
import { FacebookEmbed } from "./embedTypes/FacebookEmbed";
import { InstagramEmbed } from "./embedTypes/InstagramEmbed";
import { TelegramEmbed } from "./embedTypes/TelegramEmbed";
import { SoundCloudEmbed } from "./embedTypes/SoundCloudEmbed";
import { SpotifyEmbed } from "./embedTypes/SpotifyEmbed";
import { VideoEmbed } from "./embedTypes/VideoEmbed";
import { EmbedComponentType } from "./types";
import isUrl from "is-url";
import { GoogleFormEmbed } from "./embedTypes/GoogleFormEmbed";

enum EmbedType {
  Default = "default",
  Image = "image",
  YouTube = "youtube",
  Twitter = "twitter",
  Vimeo = "vimeo",
  Facebook = "facebook",
  Instagram = "instagram",
  Telegram = "telegram",
  SoundCloud = "soundcloud",
  Spotify = "spotify",
  Video = "video",
  GoogleForm = "googleForm",
}

const typeToCheckFn = {
  [EmbedType.Default]: () => false,
  [EmbedType.Image]: (url: string) => isMediaUrl("image", url),
  [EmbedType.YouTube]: (url: string) => isMediaUrl("youtube", url),
  [EmbedType.Twitter]: (url: string) => isMediaUrl("twitter", url),
  [EmbedType.Vimeo]: (url: string) => isMediaUrl("vimeo", url),
  [EmbedType.Facebook]: (url: string) => isMediaUrl("facebook", url),
  [EmbedType.Instagram]: (url: string) => isMediaUrl("instagram", url),
  [EmbedType.Telegram]: (url: string) => isMediaUrl("telegram", url),
  [EmbedType.SoundCloud]: (url: string) => isMediaUrl("soundcloud", url),
  [EmbedType.Spotify]: (url: string) => isMediaUrl("spotify", url),
  [EmbedType.Video]: (url: string) => isMediaUrl("video", url),
  [EmbedType.GoogleForm]: (url: string) => isMediaUrl("googleForm", url),
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
  [EmbedType.SoundCloud]: SoundCloudEmbed,
  [EmbedType.Spotify]: SpotifyEmbed,
  [EmbedType.Video]: VideoEmbed,
  [EmbedType.GoogleForm]: GoogleFormEmbed,
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
  [EmbedType.SoundCloud]: -1,
  [EmbedType.Spotify]: -1,
  [EmbedType.Video]: 16 / 9,
  [EmbedType.GoogleForm]: 1,
};

export const getTypeBySrc = (src: string) => {
  const types = Object.keys(typeToCheckFn) as EmbedType[];
  return types.find((type) => typeToCheckFn[type](src));
};

export const Embed: EmbedComponentType = ({
  src,
  title,
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
