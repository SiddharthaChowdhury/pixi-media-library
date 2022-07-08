import { IWorkerLoaderResp } from "./IWorkerLoaderResp";

const self = globalThis as any;

self.onmessage = (e: MessageEvent<{ src: string; name: string }>) => {
  const { src, name } = e.data;
  if (!src) return;

  const x = new XMLHttpRequest();
  x.responseType = "blob";
  x.onload = function () {
    const resp: IWorkerLoaderResp = {
      loadedSrc: src,
      name,
    };
    self.postMessage(resp);
  };
  x.open("GET", src, true);
  x.send();
};
