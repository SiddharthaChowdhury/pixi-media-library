import { createStore, applyMiddleware, compose, Action } from 'redux';
import rootReducer from './rootReducer';
import { IState } from './IState';


// const epicMiddleware = createEpicMiddleware<Action, Action, IState>();
const middleware: any = [
//   epicMiddleware
];
const initialState = {};
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));
const Store = createStore(rootReducer, initialState, enhancers);

export default Store;

// epicMiddleware.run(rootEpic);