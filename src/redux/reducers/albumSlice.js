import { SET_ALBUMS } from "../actions";
import { fetchAlbums } from "../../api";
import { setAlbums } from "../actionCreators";
import { transformAlbums } from "../../utils";

export const fetchAlbumsIntoStore = async (dispatch, getState) => {
  const response = await fetchAlbums();
  const transformedAlbums = transformAlbums(response);
  dispatch(setAlbums(transformedAlbums));
};

export const albumReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALBUMS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
