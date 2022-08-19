import * as PIXI from "pixi.js-legacy";
import { KeyManager } from "../../../../eventManager/KeyManager/KeyManager";
import { ETvKey, ICloseable } from "../../../../eventManager/types";
import NavigationMap from "../../../../navigation/NavigationMap";
import { ENavigationDirection } from "../../../../navigation/types";
import utilNavigation from "../../../../navigation/utilNavigation";
import { PixiColumn } from "../../../../pixi";
import { BatchLoader } from "../../../../preloader/batchLoader";
import { dimenstion } from "../../config/dimension";
import { focusHelper } from "../../helpers/focusHelper";
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
      width: dimenstion.sideNav.collapsed.width,
      height: this.height_orig,
      name: colName,
      x2:
        dimenstion.sideNav.collapsed.pos.x + dimenstion.sideNav.collapsed.width, // pos.x + width (0 + 75)
      y2: this.height_orig, // pos.y + height
    });
    NavCol.x = dimenstion.sideNav.collapsed.pos.x;
    NavCol.y = dimenstion.sideNav.collapsed.pos.y;

    return NavCol;
  };

  // Col (Column) or VS (Virtual Scrollable)
  private setContentCol = () => {
    const batchLoader = new BatchLoader(PIXI.Loader.shared, {
      enableLog: true,
    });

    const contentColumn = new ContentCol({
      boxStructure: {
        x: dimenstion.mainContent.x,
        y: dimenstion.mainContent.y,
        width: dimenstion.mainContent.width,
        height: this.height_orig,
        x2: dimenstion.mainContent.x + dimenstion.mainContent.width, // pos.x + width
        y2: this.height_orig, // pos.y + height
      },
      layerId: LAYER,
      loader: batchLoader,
    });

    return contentColumn;
  };

  private handleNavigation = (direction: ENavigationDirection) => {
    const nextFocusItemObj = homepageNavMap.getNextNavigate(direction);

    // If NEXT item dont exist , we do nothing
    if (!nextFocusItemObj) return;

    focusHelper(this).focusItem(
      nextFocusItemObj,
      homepageNavMap.getActiveState()
    );

    homepageNavMap.updateMapData(nextFocusItemObj);
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
    focusHelper(this).initFocus(homepageNavMap.getActiveState());

    this.closeKeySubs = KeyManager.onKeyDown((keyevent) => {
      switch (keyevent.virtualKey) {
        case ETvKey.RIGHT:
          this.handleNavigation(ENavigationDirection.RIGHT);
          break;
        case ETvKey.LEFT:
          this.handleNavigation(ENavigationDirection.LEFT);
          break;
        case ETvKey.UP:
          this.handleNavigation(ENavigationDirection.UP);
          break;
        case ETvKey.DOWN:
          this.handleNavigation(ENavigationDirection.DOWN);
          break;
        default:
          break;
      }
    });
  }
}

export default HomePage;
