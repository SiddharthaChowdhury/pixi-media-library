import { IKeyMapper, ETvKey, TKeyTable } from "./types";

export class KeyMapperBase implements IKeyMapper {
  protected keyTable!: TKeyTable;

  public getKeyMap(): TKeyTable {
    return this.keyTable;
  }

  /**
   * Maps virtual key to key code dependent on current keymapping
   * @param virtualKey virtual key
   * @returns  key code for the virtual key
   */
  public mapVirtualKey(virtualKey: ETvKey) {
    const code = Object.keys(this.keyTable).find(
      (k) => this.keyTable[parseInt(k, 10)] === virtualKey
    );

    return code ? parseInt(code, 10) : undefined;
  }

  /**
   * Maps key code of the device to the virtual key
   * @param keyCode device key code
   */
  public mapKeyCode(keyCode: number) {
    const virtualKey = this.keyTable[keyCode];

    return virtualKey || ETvKey.UNKNOWN;
  }
}
