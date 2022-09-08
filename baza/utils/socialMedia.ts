const socialMediaRegExps = {
  image: /^(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg|webp))/,
  video: /^(http)?s?:?(\/\/[^"']*\.(?:mp4|webm))/,
  youtube:
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
  twitter: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/,
  vimeo:
    /^(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/,
  facebook:
    /^https:\/\/www\.facebook\.com\/(photo(\.php|s)|permalink\.php|media|questions|notes|[^\/]+\/(activity|posts))[\/?].*$/,
  instagram: /(?:https?:\/\/www\.)?instagram\.com\S*?\/p\/(\w{11})\/?/,
  telegram: /^(?:https?:\/\/www\.)?t\.me\S*?(?:\/s)?\/(.+?\/\d+)\/?/,
  soundcloud: /^(?:https?:\/\/)?soundcloud\.com\/.+?\/.+?/,
  spotify: /^(?:https?:\/\/)?open\.spotify\.com\/(album|track)\/.+?/,
};

export const isSocialMediaUrl = (
  media: keyof typeof socialMediaRegExps,
  url: string
) => {
  return socialMediaRegExps[media].test(url);
};
