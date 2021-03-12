import { SET_ALBUMS, SET_PODCASTS } from "./actions";

export const setAlbums = payload => {
  return {
    type: SET_ALBUMS,
    payload: payload,
  };
};

export const setPodcasts = payload => {
  return {
    type: SET_PODCASTS,
    payload: payload,
  };
};
