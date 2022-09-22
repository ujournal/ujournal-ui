const mediaRegExps = {
  image: /^(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg|webp))/,
  video: /^(http)?s?:?(\/\/[^"']*\.(?:mp4|webm))/,
  youTube:
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
  twitter: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/,
  vimeo:
    /^(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/,
  facebook:
    /^https:\/\/www\.facebook\.com\/(photo(\.php|s)|permalink\.php|media|questions|notes|[^\/]+\/(activity|posts))[\/?].*$/,
  instagram: /(?:https?:\/\/(?:www\.)?)?instagram\.com\S*?\/p\/(\w{11})\/?.+?/,
  telegram: /^(?:https?:\/\/(?:www\.)?)?t\.me\S*?(?:\/s)?\/(.+?\/\d+)\/?/,
  soundCloud: /^(?:https?:\/\/(?:www\.)?)?soundcloud\.com\/.+?\/.+?/,
  spotify: /^(?:https?:\/\/)?open\.spotify\.com\/(album|track)\/.+?/,
  googleForm: /https:\/\/docs\.google\.com\/forms\/d\/e\/.+?\/viewform.+?/,
  tiktok: /^(?:https?:\/\/(?:www\.)?)tiktok\.com\/@(.+?)\/video\/(\d+)/,
  reddit: /^(?:https?:\/\/(?:www\.)?)reddit\.com\/(.+?)(?:(\?.+)?)$/,
};

export const mediaKeys = Object.keys(mediaRegExps);

export const isMediaUrl = (media: keyof typeof mediaRegExps, url: string) => {
  return mediaRegExps[media].test(url);
};
