import "./index.css";
import { createRoot } from "react-dom/client";
import { Stage } from "react-konva";
import Homepage from "./pages/homepage/Homepage";
import { boxDiam } from "./config/dimension";

const App = () => {
  return (
    <Stage width={boxDiam.window.width} height={boxDiam.window.height}>
      <Homepage />
    </Stage>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
