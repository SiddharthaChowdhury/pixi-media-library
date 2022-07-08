import { filter, fromEvent, share, throttleTime } from "rxjs";

export const KEYS = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

const keyWhileList = Object.values(KEYS);

export const keyDown$ = fromEvent(document, "keydown").pipe(
  throttleTime(50),
  filter((e: any) => keyWhileList.includes(e.keyCode)),
  share()
);
export const keyUp$ = fromEvent(document, "keyup").pipe(
  filter((e: any) => keyWhileList.includes(e.keyCode)),
  share()
);
