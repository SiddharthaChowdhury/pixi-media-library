import "./util";

const self = globalThis as any;

self.onmessage = (e: MessageEvent<string>) => {
  /**
   var x = new XMLHttpRequest();
x.responseType = 'blob';
x.onload = function () {
    //Do something
}
x.open('GET', url, true);
x.send();
   */
  console.log("Worker received:", e.data);
  self.postMessage(e.data + " and cats");
};
