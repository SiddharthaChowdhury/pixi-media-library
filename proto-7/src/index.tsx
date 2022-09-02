import "./index.css";
import { createRoot } from "react-dom/client";
import { ReactReduxContext, Provider } from "react-redux";
import { Stage } from "react-konva";
import Homepage from "./pages/homepage/Homepage";
import { boxDiam } from "./config/dimension";
import getStore from "./redux/store";

export const reduxStore = getStore();

const App = () => {
  return (
    // <ReactReduxContext.Consumer>
    //   {({ store }) => (
    // <Stage width={window.innerWidth} height={window.innerHeight}>
    //   <Provider store={store}>
    //     <Layer>
    //       {staticTargets.map(t => (
    //         <Target target={t} key={t.id} />
    //       ))}
    //     </Layer>
    //     <Layer name="dragging-layer">
    //       {movingTargets.map(t => (
    //         <Target target={t} key={t.id} />
    //       ))}
    //     </Layer>
    //   </Provider>
    // </Stage>
    <Provider store={reduxStore}>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage width={boxDiam.window.width} height={boxDiam.window.height}>
            <Provider store={store}>
              <Homepage />
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Provider>
    //   )}
    // </ReactReduxContext.Consumer>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
