const imageRegex = /(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg|webp))/;
const videoRegex = /(http)?s?:?(\/\/[^"']*\.(?:mp4|webm))/;
const youtubeRegex =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const twitterRegex =
  /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;

export const isImage = (url: string) => {
  return imageRegex.test(url);
};

export const isVideo = (url: string) => {
  return videoRegex.test(url);
};

export const isYouTube = (url: string) => {
  return youtubeRegex.test(url);
};

export const isTwitter = (url: string) => {
  return twitterRegex.test(url);
};
