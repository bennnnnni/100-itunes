import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import MainView from "./MainView";
import { fetchAlbumsIntoStore } from "./redux/reducers/albumSlice";

const AlbumView = () => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.items);
  const loading = useSelector(state => state.albums.loading);
  const error = useSelector(state => state.albums.error);

  useEffect(() => {
    if (albums.length === 0) {
      dispatch(fetchAlbumsIntoStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MainView items={albums} error={error} loading={loading} />;
};

export default AlbumView;
