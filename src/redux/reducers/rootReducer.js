import { combineReducers } from "redux";

import { albumReducer } from "./albumSlice";
import { podcastReducer } from "./podcastSlice";

const rootReducer = combineReducers({
  albums: albumReducer,
  podcasts: podcastReducer,
});

export default rootReducer;
