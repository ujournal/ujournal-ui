export const loadImageAndGetSize = async (src: string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = (event: Event) => {
      resolve({
        width: (event.target as HTMLImageElement).width,
        height: (event.target as HTMLImageElement).height,
      });
    };
    image.onerror = reject;
    image.src = src;
  });
};

export const cleanupRateFromImageSrc = (src: string) => {
  return src.replace(/\#r=([\d\.]+)$/, "");
};

export const getRateFromImageSrc = (src: string, defaultRatio: number = 1) => {
  const matches = src.match(/\#r=([\d\.]+)$/);
  const [, ratio] = matches || [undefined, defaultRatio];
  return Number(ratio);
};
