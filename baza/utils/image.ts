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
