import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";

const getStore = () => {
  const middleware: any = [];
  const initialState = {};
  const composeEnhancers =
    (process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const enhancers = composeEnhancers(applyMiddleware(...middleware));

  return createStore(rootReducer, initialState, enhancers);
};

export default getStore;
