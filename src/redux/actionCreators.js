import {
  SET_ALBUMS,
  SET_PODCASTS,
  SET_ALBUM_ERROR,
  SET_ALBUM_LOADING,
  SET_PODCAST_ERROR,
  SET_PODCAST_LOADING,
  UPDATE_ALBUM,
  SET_VIEW,
  UPDATE_PODCAST,
} from "./actions";

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

export const setPodcastError = payload => {
  return {
    type: SET_PODCAST_ERROR,
    payload: payload,
  };
};

export const setPodcastLoading = payload => {
  return {
    type: SET_PODCAST_LOADING,
    payload: payload,
  };
};

export const setAlbumError = payload => {
  return {
    type: SET_ALBUM_ERROR,
    payload: payload,
  };
};

export const setAlbumLoading = payload => {
  return {
    type: SET_ALBUM_LOADING,
    payload: payload,
  };
};

export const updateAlbum = payload => {
  return {
    type: UPDATE_ALBUM,
    payload: payload,
  };
};

export const updatePodcast = payload => {
  return {
    type: UPDATE_PODCAST,
    payload: payload,
  };
};

export const setView = payload => {
  return {
    type: SET_VIEW,
    payload: payload,
  };
};
