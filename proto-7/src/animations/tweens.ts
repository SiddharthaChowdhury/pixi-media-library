import Konva from "konva";

export const tweens = (object: any) => {
  const moveY = (
    y: number,
    speedDelay: number = 0.2,
    onFinish?: () => void
  ) => {
    const anim = new Konva.Tween({
      node: object,
      duration: speedDelay,
      y,
    });
    if (onFinish) {
      anim.onFinish = onFinish;
    }

    anim.play();
  };

  const moveX = (
    x: number,
    speedDelay: number = 0.1,
    onFinish?: () => void
  ) => {
    const anim = new Konva.Tween({
      node: object,
      duration: speedDelay,
      x,
    });

    if (onFinish) {
      anim.onFinish = onFinish;
    }

    anim.play();
  };

  return {
    moveY,
    moveX,
  };
};
