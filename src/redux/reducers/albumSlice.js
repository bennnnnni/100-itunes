import { SET_ALBUMS, SET_ALBUM_ERROR, SET_ALBUM_LOADING } from "../actions";
import { fetchAlbums } from "../../api";
import { setAlbumError, setAlbumLoading, setAlbums } from "../actionCreators";
import { transformAlbums } from "../../utils";

const initialState = { items: null, loading: true, error: "" };

export const fetchAlbumsIntoStore = async (dispatch, getState) => {
  try {
    const response = await fetchAlbums();
    const transformedAlbums = transformAlbums(response);
    dispatch(setAlbums(transformedAlbums));
    dispatch(setAlbumLoading(false));
  } catch (e) {
    dispatch(setAlbumError(e));
    dispatch(setAlbumLoading(false));
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
    default:
      return state;
  }
};
