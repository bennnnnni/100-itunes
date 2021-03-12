import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import MainView from "./MainView";
import { fetchAlbumsIntoStore } from "./redux/reducers/albumSlice";

const AlbumView = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums);

  useEffect(() => {
    try {
      dispatch(fetchAlbumsIntoStore);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("albums keck", albums);
  return <MainView items={albums} error={error} loading={loading} />;
};

export default AlbumView;
