import {
  SET_ALBUMS,
  SET_ALBUM_ERROR,
  SET_ALBUM_LOADING,
  UPDATE_ALBUM,
} from "../actions";
import { fetchAlbums } from "../../api";
import { setAlbumError, setAlbumLoading, setAlbums } from "../actionCreators";
import { transformAlbums } from "../../utils";
import { loadingStates } from "../../constants";

const { IDLE, LOADING, SUCCEEDED, FAILED } = loadingStates;

const initialState = { items: [], loading: IDLE, error: null };

export const fetchAlbumsIntoStore = async (dispatch, getState) => {
  dispatch(setAlbumLoading(LOADING));
  try {
    const response = await fetchAlbums();
    const transformedAlbums = transformAlbums(response);
    dispatch(setAlbums(transformedAlbums));
    dispatch(setAlbumLoading(SUCCEEDED));
  } catch (e) {
    dispatch(setAlbumError(e));
    dispatch(setAlbumLoading(FAILED));
    console.error(e);
  }
};

export const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS: {
      return { ...state, items: [...action.payload] };
    }
    case SET_ALBUM_ERROR: {
      return { ...state, error: action.payload };
    }
    case SET_ALBUM_LOADING: {
      return { ...state, loading: action.payload };
    }
    case UPDATE_ALBUM: {
      // eslint-disable-next-line array-callback-return
      const updatedAlbums = state.items.map(item => {
        if (item.id === action.payload.id) {
          item.fav = action.payload.fav;
        }
        return item;
      });
      return { ...state, items: updatedAlbums };
    }
    default:
      return state;
  }
};
