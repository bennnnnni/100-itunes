import { combineReducers } from "redux";

import { albumReducer } from "./albumSlice";
import { podcastReducer } from "./podcastSlice";
import { appReducer } from "./appSlice";

const rootReducer = combineReducers({
  albums: albumReducer,
  podcasts: podcastReducer,
  appState: appReducer,
});

export default rootReducer;
