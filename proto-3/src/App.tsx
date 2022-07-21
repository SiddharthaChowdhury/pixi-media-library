import { useEffect, useRef } from "react";
import "./App.css";
import keyListener, { IKeySubscription } from "./listeners/keyListener";
import { formatTeaser__MockData } from "./mocks/teasers__mock";
import PixiClass from "./pixi";
import { TeaserLane } from "./pixi/components/lane/teaserLane";
import { ETeaserType } from "./pixi/components/teaser/types";

const CANVAS_CONTAINER_ID = "blabla_1";

const App = () => {
  const pixiClassRef = useRef<any>(null);
  const keySubscription = useRef<IKeySubscription | undefined>();

  useEffect(() => {
    if (pixiClassRef.current) return;

    pixiClassRef.current = new PixiClass({
      width: 1280,
      height: 450,
      containerNodeId: CANVAS_CONTAINER_ID,
    });

    const LANE_ID = "LANE_0";
    const lane = new TeaserLane(pixiClassRef.current, LANE_ID);

    // Add new Lane to the canvas (and consider showing atmost 7 items at a time)
    lane.addLane({ x: 10, y: 20 }, LANE_ID, 8);

    // Throwing all teasers inside the above lane
    formatTeaser__MockData.forEach((data, key) => {
      lane.registerNewTeaser(
        {
          teaserType: ETeaserType.FORMAT,
          teaserData: data,
          id: `${LANE_ID}_TEASER_${key}`,
        },
        20 // Space between teasers
      );
    });

    lane.updateFocus();

    // key event listener
    keySubscription.current = keyListener.subscribe("app", "keyup", (e) => {
      if (e.key === "ArrowLeft") {
        lane.navLeft(true);
      }
      if (e.key === "ArrowRight") {
        lane.navRight(true);
      }
    });

    // return () => {
    //   console.log("##### UNSUBS PP call");
    //   if (keySubscription.current) {
    //     keySubscription.current?.unsubscribe();
    //   }
    // };
  }, []);

  return (
    <div
      id={CANVAS_CONTAINER_ID}
      style={{ width: "1280px", height: "600px", backgroundColor: "cyan" }}
    />
  );
};

export default App;
