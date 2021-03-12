import { SET_PODCASTS } from "../actions";
import { fetchPodcasts } from "../../api";
import { setPodcasts } from "../actionCreators";
import { transformPodcasts } from "../../utils";

export const fetchPodcastsIntoStore = async (dispatch, getState) => {
  const response = await fetchPodcasts();
  const transformedPodcasts = transformPodcasts(response);
  dispatch(setPodcasts(transformedPodcasts));
};

export const podcastReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PODCASTS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
