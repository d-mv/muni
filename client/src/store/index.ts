import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { logger } from "redux-logger";

import { setModule } from "./app/reducers";
import {
  setToken,
  checkToken,
  login,
  setModuleU,
  fetchLocations
} from "./users/reducers";
import { apiResponse } from "./users/types";
import { apiState } from "./defaults";

// set default url for API
axios.defaults.baseURL = process.env.REACT_APP_SELF
  ? `${process.env.REACT_APP_SELF}`
  : "/api";

const rootReducer = combineReducers({
  token: setToken,
  checkTokenResult: checkToken,
  login: login,
  module: setModuleU,
  locations: fetchLocations
});
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunk, logger];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  interface state {
    token: string;
    checkTokenResult: any;
    login: apiResponse;
    module: string;
    locations: apiResponse;
  }

  const initialState: state = {
    token: "",
    checkTokenResult: "",
    login: apiState,
    module: "welcome",
    locations: apiState
  };

  const store = createStore(rootReducer, initialState, middleWareEnhancer);

  return store;
}
