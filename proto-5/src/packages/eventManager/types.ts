export type TEventManagerListener<T> = (args: T) => boolean | void;

export * from "./KeyManager/types";

export interface IEventManager<T> {
  on(
    name: string,
    listener: TEventManagerListener<T>,
    priority?: number
  ): ICloseable;
  broadcast(name: string, arg: T): boolean;
}

export interface IRegisterItem<T> {
  prio: number;
  listener: TEventManagerListener<T>;
}

export interface ICloseable {
  (): void;
}
