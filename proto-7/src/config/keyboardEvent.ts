import { fromEvent } from "rxjs";

export const keyDown$ = fromEvent<KeyboardEvent>(document, "keydown");
export const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup");
