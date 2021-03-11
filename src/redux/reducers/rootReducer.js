import { combineReducers } from "redux";

import { albumReducer } from "./albumSlice";

const rootReducer = combineReducers({
  albums: albumReducer,
});

export default rootReducer;
