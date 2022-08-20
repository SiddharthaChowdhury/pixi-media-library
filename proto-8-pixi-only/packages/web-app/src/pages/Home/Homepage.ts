import * as PIXI from "pixi.js-legacy";
import { NavigationMap } from "@mono/navigation";
import { PixiPage, BatchLoader } from "@mono/pixi-engine";
import { dimenstion } from "../../config/dimension";
import ContentCol from "./columns/ContentCol";

const LAYER_ID = 0;

export const homepageNavMap = new NavigationMap();

class Homepage extends PixiPage {
  private width_orig = 0;
  private height_orig = 0;

  private setContentColumn = () => {
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

    this.addChild(this.setContentColumn());

    console.log(">>>>>< homepageNavMap ", homepageNavMap.getMapObj());
  }
}

export default Homepage;
