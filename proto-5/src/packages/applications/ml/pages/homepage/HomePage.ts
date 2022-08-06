import * as PIXI from "pixi.js-legacy";
import NavigationMap from "../../../../navigation/NavigationMap";
import utilNavigation from "../../../../navigation/utilNavigation";
import { PixiColumn } from "../../../../pixi";
import { ERectBorderRadiusType } from "../../../../pixi/components/atoms";
import { Stage } from "../../../../pixi/components/molecules";
import { navMap } from "../../App";

interface IHomePageProps {
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;
}

// used for navigation
const LAYER = 0;
class HomePage extends PIXI.Container {
  private width_orig = 0;
  private height_orig = 0;

  private getStage = (parentColId: number[]) => {
    const rowId = 0;
    return new Stage({
      navMeta: {
        layerId: LAYER,
        parentColId,
        rowId,
      },
      x: 10,
      y: 10,
      width: 1200,
      height: 544,

      border: {
        radius: {
          size: 30,
          type: ERectBorderRadiusType.BOTTOM_CORNERS,
        },
        color: "#eb4034",
        width: 3,
      },
      fillColor: "#abf5d9",
    });
  };

  // Col (Column) or VS (Virtual Scrollable)
  private setNavCol = () => {
    const colId = [0, 0]; // Useful for navigation
    const colName = utilNavigation.vsNumberArrToStr(colId); // Useful for navigation

    // Register to enable navigation
    // here we are letting the navigation engine know that we have a new Column or VS (Virtual Scrollable)
    navMap.addNewVs({}, colId, LAYER);

    const NavCol = new PixiColumn({
      width: 75,
      height: this.height_orig,
      name: colName,
    });
    NavCol.x = 0;
    NavCol.y = 0;

    return NavCol;
  };

  // Register to enable navigation
  // here we are letting the navigation engine know that we have a new Column or VS (Virtual Scrollable)
  private setContentCol = () => {
    const colId = [1, 0]; // Useful for navigation
    const colName = utilNavigation.vsNumberArrToStr(colId); // Useful for navigation

    // Register to enable navigation
    // here we are letting the navigation engine know that we have a new Column or VS (Virtual Scrollable)
    navMap.addNewVs({}, colId, LAYER);

    const MainCol = new PixiColumn({
      width: 1200,
      height: this.height_orig,
      name: colName,
    });
    MainCol.x = 80;
    MainCol.y = 0;

    const stage = this.getStage(colId);
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

    console.log(">>>>>> Map nav = ", navMap.map);
  }
}

export default HomePage;
