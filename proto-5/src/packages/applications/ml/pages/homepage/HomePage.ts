import * as PIXI from "pixi.js-legacy";
import { PixiColumn } from "../../../../pixi";
import { ERectBorderRadiusType } from "../../../../pixi/components/atoms";
import { Stage } from "../../../../pixi/components/molecules";

interface IHomePageProps {
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;
}

class HomePage extends PIXI.Container {
  private width_orig = 0;
  private height_orig = 0;

  private getStage = () => {
    return new Stage({
      name: "ROW-0",
      index: 0,
      x: 10,
      y: 10,
      width: 1200,
      height: 400,

      border: {
        radius: {
          size: 15,
          type: ERectBorderRadiusType.BOTTOM_CORNERS,
        },
        color: "#eb4034",
        width: 3,
      },
      fillColor: "#abf5d9",
    });
  };

  private setNavCol = () => {
    const NavCol = new PixiColumn({
      width: 75,
      height: this.height_orig,
      name: "COL-0",
      index: 0,
    });
    NavCol.x = 0;
    NavCol.y = 0;

    return NavCol;
  };

  private setContentCol = () => {
    const MainCol = new PixiColumn({
      width: 1200,
      height: this.height_orig,
      name: "COL-1",
      index: 1,
    });
    MainCol.x = 80;
    MainCol.y = 0;

    const stage = this.getStage();
    MainCol.addChild(stage);

    return MainCol;
  };

  constructor(props: IHomePageProps) {
    super();

    this.width_orig = props.width;
    this.height_orig = props.height;
    this.x = props.x;
    this.y = props.y;
    this.name = props.name;

    this.addChild(this.setNavCol(), this.setContentCol());
  }
}

export default HomePage;
