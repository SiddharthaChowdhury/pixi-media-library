import Konva from "konva";

export const tweens = (object: any) => {
  const moveY = (y: number, speedDelay: number = 0.2) => {
    new Konva.Tween({
      node: object,
      duration: speedDelay,
      y,
    }).play();
  };

  return {
    moveY,
  };
};
