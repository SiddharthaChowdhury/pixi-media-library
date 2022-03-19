export const scrollRightLane = ({ vs, lane, item }: any) => {
  const vs_x2 = vs.x + (vs.widthVirtual || vs.width); // right-corner of Vs
  const lane_x2 = lane.x + lane.width; // right-corner of lane
  const padding = lane.spaceBetweenItems || 0;

  const itemWidthWithPadding = item.width + padding;

  if (lane_x2 > vs_x2) {
    // right-corner of lane is outside right-corner of Vs
    const displacement = lane_x2 - itemWidthWithPadding;
    let laneMoveLeft = itemWidthWithPadding;

    if (displacement < vs_x2) {
      // we adjust the lanes's left movement and make sure the lane's-x2 doesnt leaves behind Vs's-x2 (max lane's-X2 can be eq to Vs's-x2 )
      laneMoveLeft = vs_x2 - displacement;
    }

    lane.x -= laneMoveLeft;
  }
};
