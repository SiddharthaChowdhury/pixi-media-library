import { imageWorker } from "..";

export type TImageWorkerData = { src: string; loadedSrc: string };

export const loadImageByWorker = (
  src: string,
  name: string
): Promise<TImageWorkerData> => {
  return new Promise((resolve, reject) => {
    imageWorker.onmessage = (e: MessageEvent<TImageWorkerData>) => {
      resolve(e.data);
    };

    imageWorker.onerror = reject;

    imageWorker.postMessage({ src, name });
  });
};
