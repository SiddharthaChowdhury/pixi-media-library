import React, { useEffect, useRef } from "react";
import "./App.css";
import PixiClass from "./pixi";
import Teaser from "./pixi/components/teaser/Teaser";
import { ETeaserType } from "./pixi/components/teaser/types";

const CANVAS_CONTAINER_ID = "blabla_1";

const App = () => {
  const pixiClassRef = useRef<any>(null);

  useEffect(() => {
    if (pixiClassRef.current) return;

    pixiClassRef.current = new PixiClass({
      width: 600,
      height: 300,
      containerNodeId: CANVAS_CONTAINER_ID,
    });

    const LANE_ID = "LANE_0";
    const TEASER_ID = "TEASER_0";
    const teaserData = {
      id: 0,
      title: "",
      description: "",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg",
    };

    const teaserData2 = {
      id: 0,
      title: "",
      description: "",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/3/31/Daintree_Rainforest_4.jpg",
    };

    pixiClassRef.current.addLane(10, 10, LANE_ID);
    pixiClassRef.current.addTeaserToLane(LANE_ID, {
      teaserType: ETeaserType.FORMAT,
      teaserData: teaserData,
      id: TEASER_ID,
    });

    setTimeout(() => {
      pixiClassRef.current.addTeaserToLane(LANE_ID, {
        teaserType: ETeaserType.FORMAT,
        teaserData: teaserData2,
        id: "TEASER_1",
      });
    }, 1000);

    setTimeout(() => {
      pixiClassRef.current.addTeaserToLane(LANE_ID, {
        teaserType: ETeaserType.FORMAT,
        teaserData: teaserData,
        id: "TEASER_2",
      });
    }, 3000);
  }, []);

  return (
    <div
      id={CANVAS_CONTAINER_ID}
      style={{ width: "1280px", height: "400px", backgroundColor: "cyan" }}
    />
  );
};

export default App;
