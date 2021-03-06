import { Container } from "pixi.js";
import atoms from "../atoms";
import { IRectProps } from "../atoms/rect/rect";
import pixiClass from "../../index";

export interface ILoading {
  loadingCont: Container;
  stopLoading: () => void;
}

export const getLoadingTeaser = (rect: IRectProps): ILoading => {
  const { width, height } = rect;
  const container = new Container();

  const overlay = atoms.getRect({ ...rect });

  const spinner = atoms.getRect({
    width: 50,
    height: 50,
    x: 0,
    y: 0,
    borderRadius: 10,
    borderColor: 0xffffff,
    borderWidth: 4,
  });
  spinner.pivot.x = spinner.width / 2;
  spinner.pivot.y = spinner.height / 2;

  spinner.x = width / 2;
  spinner.y = height / 2;

  const speed = 1;
  const animation = (delta: number) => {
    spinner.rotation += (speed * delta) / 25;
  };
  pixiClass.application.ticker.add(animation);

  container.addChild(overlay, spinner);
  container.name = "LOADING";

  return {
    loadingCont: container,
    stopLoading: () => {
      pixiClass.application.ticker.remove(animation);
    },
  };
};
