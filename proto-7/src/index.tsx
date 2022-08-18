import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Stage, Layer } from "react-konva";
import StageHomepage from "./components/molecules/stage/StageHomepage";

const App = () => {
  return (
    <Stage width={1280} height={720}>
      <Layer>
        <StageHomepage
          x={10}
          y={10}
          height={400}
          width={500}
          cornerRadius={20}
          imageUrl="http://konvajs.github.io/assets/darth-vader.jpg"
        />
      </Layer>
    </Stage>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
