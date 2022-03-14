import { buffer, debounceTime, Observable, OperatorFunction, share, Subject } from "rxjs";
import pixiClass from "../pixiClass";

type BufferDebounce = <T>(debounce: number) => OperatorFunction<T, T[]>;
const bufferDebounce: BufferDebounce = (debounce) => (source) =>
  new Observable((observer) =>
    source.pipe(buffer(source.pipe(debounceTime(debounce)))).subscribe({
      next(x) {
        observer.next(x);
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      },
    })
  );
  

export const assetLoaderCollector$ = new Subject<{uniqName: string, src: string}>();

assetLoaderCollector$.pipe(bufferDebounce(300)).subscribe((assets: {uniqName: string, src: string}[]) => {
    console.log("All assets ready to load ", assets);

    pixiClass.loadAsset(assets)
});
