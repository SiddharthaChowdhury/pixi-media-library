import Konva from "konva";

export const tweens = (object: any) => {
  const moveY = (y: number, speedDelay: number = 0.2) => {
    new Konva.Tween({
      node: object,
      duration: speedDelay,
      y,
    }).play();
  };

  const moveX = (x: number, speedDelay: number = 0.1) => {
    new Konva.Tween({
      node: object,
      duration: speedDelay,
      x,
    }).play();
  };

  return {
    moveY,
    moveX,
  };
};
