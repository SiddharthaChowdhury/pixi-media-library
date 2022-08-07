import * as PIXI from "pixi.js-legacy";
import utilNavigation from "../../../../navigation/utilNavigation";
import { PixiColumn } from "../../../../pixi";
import { BatchLoader } from "../../../../preloader/batchLoader";
import { navMap } from "../../App";
import ContentCol from "./columns/ContentCol";

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
      x2: 75, // pos.x + width (0 + 75)
      y2: this.height_orig, // pos.y + height
    });
    NavCol.x = 0;
    NavCol.y = 0;

    return NavCol;
  };

  private setContentCol = () => {
    const batchLoader = new BatchLoader(PIXI.Loader.shared, {
      enableLog: true,
    });

    const contentColumn = new ContentCol({
      boxStructure: {
        x: 80, // 80 because the width of sideNav is 75
        y: 0,
        width: 1200,
        height: this.height_orig,
        x2: 1200, // pos.x + width
        y2: this.height_orig, // pos.y + height
      },
      layerId: LAYER,
      loader: batchLoader,
    });

    return contentColumn;
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
