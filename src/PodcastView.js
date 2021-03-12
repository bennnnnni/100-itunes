import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import MainView from "./MainView";
import { fetchPodcastsIntoStore } from "./redux/reducers/podcastSlice";

const AlbumView = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcasts);

  useEffect(() => {
    try {
      dispatch(fetchPodcastsIntoStore);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("podcasts", podcasts);
  return <MainView items={podcasts} error={error} loading={loading} />;
};

export default AlbumView;
