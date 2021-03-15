import {
  SET_PODCASTS,
  SET_PODCAST_LOADING,
  SET_PODCAST_ERROR,
} from "../actions";
import { fetchPodcasts } from "../../api";
import {
  setPodcasts,
  setPodcastError,
  setPodcastLoading,
} from "../actionCreators";
import { transformPodcasts } from "../../utils";

const initialState = { items: null, loading: true, error: "" };

export const fetchPodcastsIntoStore = async (dispatch, getState) => {
  try {
    const response = await fetchPodcasts();
    const transformedPodcasts = transformPodcasts(response);
    dispatch(setPodcasts(transformedPodcasts));
    dispatch(setPodcastLoading(false));
  } catch (e) {
    dispatch(setPodcastError);
    dispatch(setPodcastLoading(false));
    console.error(e);
  }
};

export const podcastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PODCASTS: {
      return { ...state, items: [...action.payload] };
    }
    case SET_PODCAST_LOADING: {
      return { ...state, loading: action.payload };
    }
    case SET_PODCAST_ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
