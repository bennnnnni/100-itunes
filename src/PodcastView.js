import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import MainView from "./MainView";
import { fetchPodcastsIntoStore } from "./redux/reducers/podcastSlice";

const PodcastView = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcasts.items);
  const loading = useSelector(state => state.podcasts.loading);
  const error = useSelector(state => state.podcasts.error);

  useEffect(() => {
    if (podcasts.length === 0) {
      dispatch(fetchPodcastsIntoStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MainView items={podcasts} error={error} loading={loading} />;
};

export default PodcastView;
