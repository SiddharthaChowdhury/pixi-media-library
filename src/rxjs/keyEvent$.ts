import { fromEvent, share } from "rxjs"

const keyDown$ = fromEvent(document, "keydown").pipe(share());
const keyUp$ = fromEvent(document, "keyup").pipe(share());