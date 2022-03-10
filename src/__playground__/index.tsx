import { useEffect } from "react";
import pixiClass from "../pixi/pixiClass";
import molecules from "../templates/basic/molecules";
import organisms from "../templates/basic/organisms";
import { teaserHMockData } from "../__mocks__/__mock__teaserH.data";

export const Playground2 = () => {
  useEffect(() => {
    setTimeout(() => {
      const lane = molecules.generateLane({
        name: "Actuals",
        teasers: teaserHMockData,
      });

      const verticalScroller = organisms.getVerticalScroller({
        x: 0,
        y: 0,
        name: "main",
        lanes: [
          molecules.generateLane({
            name: "Actuals",
            teasers: teaserHMockData,
          }),
          molecules.generateLane({
            name: "Actuals",
            teasers: teaserHMockData,
          }),
          molecules.generateLane({
            name: "Actuals",
            teasers: teaserHMockData,
          }),
        ],
      });

      pixiClass.pixiApp?.stage.addChild(verticalScroller);
    }, 500);
  }, []);

  return null;
};

export default Playground2;
