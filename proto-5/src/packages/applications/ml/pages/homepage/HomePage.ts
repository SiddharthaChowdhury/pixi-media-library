import * as PIXI from "pixi.js-legacy";
import { KeyManager } from "../../../../eventManager/KeyManager/KeyManager";
import { ETvKey, ICloseable } from "../../../../eventManager/types";
import NavigationMap from "../../../../navigation/NavigationMap";
import { ENavigationDirection } from "../../../../navigation/types";
import utilNavigation from "../../../../navigation/utilNavigation";
import { PixiColumn } from "../../../../pixi";
import { BatchLoader } from "../../../../preloader/batchLoader";
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
export const homepageNavMap = new NavigationMap();
class HomePage extends PIXI.Container {
  public closeKeySubs: ICloseable;
  private width_orig = 0;
  private height_orig = 0;

  // Col (Column) or VS (Virtual Scrollable)
  private setNavCol = () => {
    const colId = [0, 0]; // Useful for navigation
    const colName = utilNavigation.vsNumberArrToStr(colId); // Useful for navigation

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

  // Col (Column) or VS (Virtual Scrollable)
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
    homepageNavMap.ready();

    this.closeKeySubs = KeyManager.onKeyDown((keyevent) => {
      switch (keyevent.virtualKey) {
        case ETvKey.RIGHT:
          homepageNavMap.navigate(ENavigationDirection.RIGHT);
          break;
        case ETvKey.LEFT:
          homepageNavMap.navigate(ENavigationDirection.LEFT);
          break;
        case ETvKey.UP:
          homepageNavMap.navigate(ENavigationDirection.UP);
          break;
        case ETvKey.DOWN:
          homepageNavMap.navigate(ENavigationDirection.DOWN);
          break;
        default:
          break;
      }

      console.log(">>>>>> ", homepageNavMap.getActiveState());
    });
    console.log(">>>>>> ", homepageNavMap.getMapObj());
  }
}

export default HomePage;
