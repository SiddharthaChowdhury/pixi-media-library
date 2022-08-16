import { EventManager } from "../EventManager";
import { ICloseable } from "../types";
import { KeyMapperPc } from "./KeyMapperPc";
import {
  EKeyManagerEvents,
  ETvKey,
  IKeyEvent,
  IKeyEventListener,
  IKeyMapper,
} from "./types";

export class KeyManager {
  private static keymapper: IKeyMapper;

  private static keyEventManager = new EventManager<IKeyEvent>();

  /**
   * Subscribe to key down events
   * @param listener callback function to pass the keyevents
   * @param priority Higher prio listeners get key events first
   */
  public static onKeyDown(
    listener: IKeyEventListener,
    priority?: number
  ): ICloseable {
    return this.keyEventManager.on(
      EKeyManagerEvents.KEYDOWN,
      listener,
      priority
    );
  }

  /**
   * Subscribe to key up events
   * @param listener callback function to pass the keyevents
   * @param priority Higher prio listeners get key events first
   */
  public static onKeyUp(
    listener: IKeyEventListener,
    priority?: number
  ): ICloseable {
    return this.keyEventManager.on(EKeyManagerEvents.KEYUP, listener, priority);
  }

  /**
   * Map vritual key to current keymap specific key code
   * @param virtualKey virtual key
   */
  public static mapVirtualKey2Code(virtualKey: ETvKey) {
    return this.keymapper.mapVirtualKey(virtualKey);
  }

  private static keyDownListener = (e: KeyboardEvent) => {
    const virtualKey = KeyManager.keymapper.mapKeyCode(e.keyCode);
    const keyHandled = KeyManager.keyEventManager.broadcast(
      EKeyManagerEvents.KEYDOWN,
      {
        keyCode: e.keyCode,
        virtualKey,
      }
    );

    if (keyHandled) {
      e.stopPropagation();
    }
  };

  private static keyUpListener = (e: KeyboardEvent) => {
    const virtualKey = KeyManager.keymapper.mapKeyCode(e.keyCode);
    const keyHandled = KeyManager.keyEventManager.broadcast(
      EKeyManagerEvents.KEYUP,
      {
        keyCode: e.keyCode,
        virtualKey,
      }
    );

    if (keyHandled) {
      e.stopPropagation();
    }
  };

  private static bind() {
    window.addEventListener("keydown", this.keyDownListener, true);
    window.addEventListener("keyup", this.keyUpListener, true);
  }

  private static unbind() {
    window.removeEventListener("keydown", this.keyDownListener, true);
    window.removeEventListener("keyup", this.keyUpListener, true);
  }

  private static setKeymapper(keymapper: IKeyMapper) {
    this.keymapper = keymapper;
  }

  public static init(
    keymapConfig = { keymap: "PC" },
    oipfAppElement?: HTMLElement
  ) {
    this.unbind();
    this.bind();

    this.setKeymapper(new KeyMapperPc());
  }
}
