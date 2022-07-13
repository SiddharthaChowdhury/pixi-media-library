import { useEffect, useRef } from "react";
import "./App.css";
import keyListener, { IKeySubscription } from "./listeners/keyListener";
import { formatTeaser__MockData } from "./mocks/teasers__mock";
import PixiClass from "./pixi";
import teaserLane from "./pixi/components/lane/teaserLane";
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

    // Added Lane to canvas
    teaserLane(pixiClassRef.current).addLane(0, 0, LANE_ID, 5);

    // Throwing all teasers inside the above lane
    formatTeaser__MockData.forEach((data, key) => {
      teaserLane(pixiClassRef.current).registerNewTeaser(LANE_ID, {
        teaserType: ETeaserType.FORMAT,
        teaserData: data,
        id: `${LANE_ID}_TEASER_${key}`,
      });
    });

    // key event listener
    keySubscription.current = keyListener.subscribe("app", "keyup", (e) => {
      console.log("KEY UP callback ", e.key);
      if (e.key === "ArrowLeft") {
        teaserLane(pixiClassRef.current).navLeft("LANE_0");
      }
      if (e.key === "ArrowRight") {
        teaserLane(pixiClassRef.current).navRight("LANE_0");
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
