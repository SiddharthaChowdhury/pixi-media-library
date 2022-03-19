import { INavigationMapElements } from "./types";

export const scrollLeftLane = ({ vs, lane, item }: INavigationMapElements) => {
  const itemLeftPadding = lane.spaceBetweenItems || 0;

  const item_x1 = item.getBounds().x + itemLeftPadding;

  if (item_x1 < vs.x) {
    const difference = vs.x - (item_x1 - itemLeftPadding);
    if (lane.getBounds().x < difference) lane.x += difference;
  }
};
