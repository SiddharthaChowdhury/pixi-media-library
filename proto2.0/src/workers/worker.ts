import "./util";
const self = globalThis as any;

self.onmessage = (e: MessageEvent<{ src: string; name: string }>) => {
  const { src, name } = e.data;
  if (!src) return;

  const x = new XMLHttpRequest();
  x.responseType = "blob";
  x.onload = function () {
    self.postMessage({
      loadedSrc: src,
      name,
    });
  };
  x.open("GET", src, true);
  x.send();

  console.log("Worker received:", e.data);
};
