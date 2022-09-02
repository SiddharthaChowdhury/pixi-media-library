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
    <Provider store={reduxStore}>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={boxDiam.window.width}
            height={boxDiam.window.height}
            style={{ backgroundColor: "#09090b" }}
          >
            <Provider store={store}>
              <Homepage />
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
