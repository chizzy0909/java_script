import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
//import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
//sagaMiddleware.run(rootSaga);

//const middlewares = [logger];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

// export default { store, persistor };
