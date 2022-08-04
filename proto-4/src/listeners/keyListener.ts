interface IKeyEventsListeners {
  keyup: { [componentId: string]: (event: KeyboardEvent) => void };
  keydown: { [componentId: string]: (event: KeyboardEvent) => void };
}

export interface IKeySubscription {
  unsubscribe: () => void;
}

const keyListener = (<T extends keyof IKeyEventsListeners>() => {
  const activeListeners: IKeyEventsListeners = {
    keyup: {},
    keydown: {},
  };

  const keyupListener = (e: KeyboardEvent) => {
    Object.values(activeListeners.keyup).forEach((callback) => {
      callback(e);
    });
  };
  const keydownListener = (e: KeyboardEvent) => {
    // TODO: check why callback is not triggered when Object.values is used
    Object.keys(activeListeners.keydown).forEach((key: string) => {
      activeListeners.keydown[key](e);
    });
  };

  document.addEventListener("keyup", keyupListener);
  document.addEventListener("keydown", keydownListener);

  return {
    subscribe: (
      componentId: string,
      eventName: T,
      callback: (event: KeyboardEvent) => void
    ): IKeySubscription | undefined => {
      // return if already once subscribed
      if (activeListeners[eventName].hasOwnProperty(componentId)) return;

      // Otherwise register new callback with componentId
      activeListeners[eventName] = {
        ...activeListeners[eventName],
        [componentId]: callback,
      };

      return {
        unsubscribe: () => {
          delete activeListeners[eventName][componentId];
        },
      };
    },

    /* // We dont want to kill the listerner in our case
    destroy: () => {
      return;

      document.removeEventListener("keyup", keyupListener);
      document.removeEventListener("keydown", keydownListener);

      activeListeners.keyup = {};
      activeListeners.keydown = {};
    },
    */
  };
})();

export default keyListener;
