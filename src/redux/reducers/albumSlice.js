import { SET_ALBUMS } from "../actions";

export const albumReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALBUMS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
