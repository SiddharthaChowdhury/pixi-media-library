import * as PIXI from "pixi.js-legacy";
import { ENavigationDirection, NavigationMap } from "@mono/navigation";
import { PixiPage, BatchLoader } from "@mono/pixi-engine";
import { dimenstion } from "../../config/dimension";
import ContentCol from "./columns/ContentCol";
import { ETvKey, ICloseable } from "../../eventManager/types";
import { KeyManager } from "../../eventManager/KeyManager/KeyManager";
import { focusHelper } from "../../helpers/focusHelper";

const LAYER_ID = 0;

export const homepageNavMap = new NavigationMap();

class Homepage extends PixiPage {
  private width_orig = 0;
  private height_orig = 0;
  public closeKeySubs: ICloseable;

  // This function handles navigation of the page
  private registerKeyEvents = () => {
    const handleNavigation = (direction: ENavigationDirection) => {
      const nextFocusItemObj = homepageNavMap.getNextNavigate(direction);

      console.log(">>>>>< Nav ", nextFocusItemObj);
      // If NEXT item dont exist , we do nothing
      if (!nextFocusItemObj) return;

      focusHelper(this).focusItem(
        nextFocusItemObj,
        homepageNavMap.getActiveState()
      );

      homepageNavMap.updateMapData(nextFocusItemObj);
    };

    return KeyManager.onKeyDown((keyevent) => {
      switch (keyevent.virtualKey) {
        case ETvKey.RIGHT:
          handleNavigation(ENavigationDirection.RIGHT);
          break;
        case ETvKey.LEFT:
          handleNavigation(ENavigationDirection.LEFT);
          break;
        case ETvKey.UP:
          handleNavigation(ENavigationDirection.UP);
          break;
        case ETvKey.DOWN:
          handleNavigation(ENavigationDirection.DOWN);
          break;
        default:
          break;
      }
    });
  };

  // This function handles creation of content of the page
  private setContentColumn = () => {
    const batchLoader = new BatchLoader(PIXI.Loader.shared, {
      enableLog: true,
    });

    const contentColumn = new ContentCol({
      x: dimenstion.mainContent.x,
      y: dimenstion.mainContent.y,
      layerId: LAYER_ID,
      loader: batchLoader,
    });

    return contentColumn;
  };

  constructor() {
    super({
      layerId: LAYER_ID,
    });

    this.width_orig = dimenstion.window.width;
    this.height_orig = dimenstion.window.height;
    this.x = 0;
    this.y = 0;

    // the entire column containing the content is added to this(Homepage) Container
    this.addChild(this.setContentColumn());

    homepageNavMap.ready();
    focusHelper(this).initFocus(homepageNavMap.getActiveState());

    // Registering key events
    this.closeKeySubs = this.registerKeyEvents();

    console.log(">>>>>< homepageNavMap ", homepageNavMap.getMapObj());
  }
}

export default Homepage;
