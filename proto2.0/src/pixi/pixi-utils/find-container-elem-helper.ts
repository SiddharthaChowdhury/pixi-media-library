import { Container } from "pixi.js";
import pixiClass from "..";

export const findContainerElem = (
  vsName: string,
  laneName: string,
  itemName?: string, // either this
  itemIndex?: number // or this
): Container | null => {
  const stage = pixiClass.application.stage;

  const targetVs: Container = stage.getChildByName(vsName) as Container;
  if (targetVs) {
    const targetLane = targetVs.getChildByName(laneName) as Container;

    if (targetLane) {
      const targetItem =
        itemIndex !== undefined
          ? (targetLane.getChildAt(itemIndex) as Container)
          : (targetLane.getChildByName(itemName || "") as Container);

      return targetItem;
    }
  }

  console.log("FAILED sending null");
  return null;
};
