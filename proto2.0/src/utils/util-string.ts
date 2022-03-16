export const generateMapItemName = (
  vsIndex: number,
  laneIndex: number,
  itemIndex: number
) => `${vsIndex}-${laneIndex}-${itemIndex}`;

const getMapDataFromItemName = (itemName: string) => {
  const nameArr = itemName.split("-");

  return {
    itemIndex: nameArr[nameArr.length - 1],
    laneIndex: nameArr[nameArr.length - 2],
    vsIndex: nameArr[nameArr.length - 3],
  };
};
