import { appViews } from "../../constants";
import { SET_VIEW } from "../actions";

const { ALBUMS } = appViews;

const initialState = { currentView: ALBUMS };

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW: {
      return { currentView: action.payload };
    }
    default:
      return state;
  }
};
