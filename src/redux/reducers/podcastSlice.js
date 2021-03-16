import {
  SET_PODCASTS,
  SET_PODCAST_LOADING,
  SET_PODCAST_ERROR,
  UPDATE_PODCAST,
} from "../actions";
import { fetchPodcasts } from "../../api";
import {
  setPodcasts,
  setPodcastError,
  setPodcastLoading,
} from "../actionCreators";
import { transformPodcasts } from "../../utils";
import { loadingStates } from "../../constants";

const { IDLE, LOADING, SUCCEEDED, FAILED } = loadingStates;

const initialState = { items: [], loading: IDLE, error: "" };

export const fetchPodcastsIntoStore = async (dispatch, getState) => {
  dispatch(setPodcastLoading(LOADING));
  try {
    const response = await fetchPodcasts();
    const transformedPodcasts = transformPodcasts(response);
    dispatch(setPodcasts(transformedPodcasts));
    dispatch(setPodcastLoading(SUCCEEDED));
  } catch (e) {
    dispatch(setPodcastError(e));
    dispatch(setPodcastLoading(FAILED));
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
    case UPDATE_PODCAST: {
      // eslint-disable-next-line array-callback-return
      const updatedPodcasts = state.items.map(item => {
        if (item.id === action.payload.id) {
          item.fav = action.payload.fav;
        }
        return item;
      });
      return { ...state, items: updatedPodcasts };
    }
    default:
      return state;
  }
};
