export const helperImageLoad = (
  imageUrl: string
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject();
    };

    img.src = imageUrl;
  });
};
