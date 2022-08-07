import * as PIXI from "pixi.js-legacy";
import { homepageStructure } from "../../../../../service__mock/ui_builder_mock/homePageData_mock";
import utilNavigation from "../../../../navigation/utilNavigation";
import { PixiColumn } from "../../../../pixi";
import { navMap } from "../../App";
import { getStageHomePage } from "./stageHomepage";
import { IHomePageStructure } from "./types";

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
      x2: 57, // pos.x + width (0 + 75)
      y2: this.height_orig, // pos.y + height
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
      x2: 1200, // pos.x + width (0 + 75)
      y2: this.height_orig, // pos.y + height
    });
    MainCol.x = 80;
    MainCol.y = 0;

    // Populate the column with homepage data
    homepageStructure.forEach((partial: IHomePageStructure) => {
      switch (partial.type) {
        case "stage":
          const stage = getStageHomePage(colId, LAYER, partial);
          const bounds = stage.getBounds_orig();
          MainCol.addChildItem(stage, bounds);
          break;
        case "formatlane":
        default:
          break;
      }
    });

    console.log(">>>>> MainCol.childRecord = ", MainCol.childRecord);

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
