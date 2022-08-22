import { ETvKey, TKeyTable } from './types';
import { KeyMapperBase } from './KeyMapperBase';

export class KeyMapperPc extends KeyMapperBase {
  protected keyTable: TKeyTable = {
    37: ETvKey.LEFT,
    39: ETvKey.RIGHT,
    38: ETvKey.UP,
    40: ETvKey.DOWN,
    13: ETvKey.OK,
    8: ETvKey.BACK,
    48: ETvKey.ZERO,
    49: ETvKey.ONE,
    50: ETvKey.TWO,
    51: ETvKey.THREE,
    52: ETvKey.FOUR,
    53: ETvKey.FIVE,
    54: ETvKey.SIX,
    55: ETvKey.SEVEN,
    56: ETvKey.EIGHT,
    57: ETvKey.NINE,
    70: ETvKey.BLUE,
    87: ETvKey.CHANNEL_UP, // W
    83: ETvKey.CHANNEL_DOWN, // S
  };
}
