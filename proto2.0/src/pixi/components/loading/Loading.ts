import { Container, Graphics, Ticker } from "pixi.js";
import atoms from "../atoms";
import { IRectProps } from "../atoms/rect/rect";

export const LoadingName = "LOADING";
class Loading {
  private readonly rect: IRectProps;
  private readonly ticker: Ticker;
  private readonly spinner: Graphics;

  constructor(rect: IRectProps) {
    this.rect = rect;
    this.ticker = new Ticker();
    this.spinner = atoms.getRect({
      width: 50,
      height: 50,
      x: 0,
      y: 0,
      borderRadius: 10,
      borderColor: 0xffffff,
      borderWidth: 4,
    });
    this.spinner.pivot.x = this.spinner.width / 2;
    this.spinner.pivot.y = this.spinner.height / 2;

    const { width, height } = this.rect;

    this.spinner.x = width / 2;
    this.spinner.y = height / 2;
  }

  private contextAnimation = (delta: number) => {
    const speed = 1;
    this.spinner.rotation += (speed * delta) / 25;
  };

  public stopLoading = () => {
    this.ticker.destroy();
  };

  public start = () => {
    this.ticker.start();
  };

  public getLoadingElem = () => {
    const container = new Container();

    const overlay = atoms.getRect({ ...this.rect });

    this.ticker.add(this.contextAnimation);

    container.addChild(overlay, this.spinner);
    container.name = LoadingName;

    return container;
  };
}

export default Loading;
