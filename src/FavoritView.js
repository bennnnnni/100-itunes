import React from "react";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import MainView from "./MainView";
import { loadingStates } from "./constants";

const selectFavoriteAlbums = createSelector(
  state => state.albums,
  albums => albums.items.filter(item => item.fav === true)
);

const selectFavoritePocasts = createSelector(
  state => state.podcasts,
  podcasts => podcasts.items.filter(item => item.fav === true)
);

const FavoritView = () => {
  const favoriteAlbums = useSelector(selectFavoriteAlbums);
  const favoritePodcasts = useSelector(selectFavoritePocasts);

  return (
    <MainView
      items={[...favoriteAlbums, ...favoritePodcasts]}
      loading={loadingStates.SUCCEEDED}
    />
  );
};

export default FavoritView;
