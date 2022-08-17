import * as PIXI from "pixi.js-legacy";
import FocusableItem from "../../../../containers/FocusableItem";

interface ICircleBtnStyle {
  iconUrl?: string;
  border: {
    width: number;
    color: string;
  };
  background: {
    color: string;
    opacity?: number;
  };
}

interface ICircleButtonProps {
  radius: number;
  name: string;
  x: number;
  y: number;
  preloader: any;
  defaultStyle: ICircleBtnStyle;
  focusStyle: ICircleBtnStyle;
}

class CircleButton extends FocusableItem {
  private preloader: any;
  private defaultCircle: PIXI.Container;
  private focusedCircle?: PIXI.Container;

  // PRIVATE methods
  private getCircleGraphics = (style: ICircleBtnStyle, radius: number) => {
    const circle = new PIXI.Graphics();
    const { background, border } = style;

    circle.beginFill(
      PIXI.utils.string2hex(background.color),
      background.opacity || 1
    );
    circle.lineStyle(border.width, PIXI.utils.string2hex(border.color)); //(thickness, color)
    circle.drawCircle(0, 0, radius); //(x,y,radius)
    circle.endFill();

    return circle;
  };

  // PUBLIC methods

  public onFocus = () => {
    if (!this.focusedCircle) return;

    this.defaultCircle.renderable = false;
    this.focusedCircle.renderable = true;
  };

  public onUnFocus = () => {
    if (!this.focusedCircle) return;

    this.defaultCircle.renderable = true;
    this.focusedCircle.renderable = false;
  };

  constructor(props: ICircleButtonProps) {
    super({
      width: props.radius,
      height: props.radius,
      name: props.name,
      x2: props.x + props.radius,
      y2: props.y + props.radius,
    });

    this.x = props.x;
    this.y = props.y;
    this.preloader = props.preloader;

    this.defaultCircle = this.getCircleGraphics(
      props.defaultStyle,
      props.radius
    );

    this.addChild(this.defaultCircle);

    if (props.focusStyle) {
      this.focusedCircle = this.getCircleGraphics(
        props.focusStyle,
        props.radius
      );

      this.focusedCircle.renderable = false;
      this.addChild(this.focusedCircle);
    }
  }
}

export default CircleButton;
