export enum ETvKey {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
  OK = "OK",
  POWER = "POWER",
  BACK = "BACK",
  HOME = "HOME",
  PLAYPAUSE = "PLAYPAUSE",
  MEDIA_FASTFORWARD = "MEDIA_FASTFORWARD",
  MEDIA_REWIND = "MEDIA_REWIND",
  VOLUME_UP = "VOLUME_UP",
  VOLUME_DOWN = "VOLUME_DOWN",
  CHANNEL_UP = "CHANNEL_UP",
  CHANNEL_DOWN = "CHANNEL_DOWN",
  ZERO = "ZERO",
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  SEVEN = "SEVEN",
  EIGHT = "EIGHT",
  NINE = "NINE",
  BLUE = "BLUE",
  UNKNOWN = "UNKNOWN",
}

export type TKeyTable = Record<number, ETvKey>;

export interface IKeyMapper {
  getKeyMap(): TKeyTable;
  mapVirtualKey(virtualKey: ETvKey): number | undefined;
  mapKeyCode(keyCode: number): ETvKey;
}

export interface IKeyEvent {
  keyCode: number;
  virtualKey: ETvKey;
}

export interface IKeyEventListener {
  (keyEvent: IKeyEvent): boolean | void;
}

export enum EKeyManagerEvents {
  KEYDOWN = "keydown",
  KEYUP = "keyup",
}
