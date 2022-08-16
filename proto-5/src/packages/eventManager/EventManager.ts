import {
  ICloseable,
  IEventManager,
  IRegisterItem,
  TEventManagerListener,
} from "./types";

export class EventManager<T> implements IEventManager<T> {
  protected readonly listeners: Record<string, Array<IRegisterItem<T>>> =
    Object.create(null);

  public on(
    name: string,
    listener: TEventManagerListener<T>,
    priority = 0
  ): ICloseable {
    const namedListeners = this.listeners[name] || (this.listeners[name] = []);
    const listenerObject = { listener, prio: priority };

    namedListeners.push(listenerObject);

    return () => {
      const indexOfListener = namedListeners.indexOf(listenerObject);

      if (indexOfListener !== -1) {
        namedListeners.splice(indexOfListener, 1);
      }
    };
  }

  public broadcast(name: string, arg: T): boolean {
    const namedListeners = (this.listeners[name] || []).sort(
      (item1, item2) => item2.prio - item1.prio
    );

    const eventHandled = namedListeners.some((namedListener) => {
      let result = false;

      try {
        result = namedListener.listener(arg) === true;
      } catch (error) {
        console.error(
          `[sprnv:EventManager] - Error within logging code. ${error}`
        );
      }

      return result;
    });

    return eventHandled;
  }
}
