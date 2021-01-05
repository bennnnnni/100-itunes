import React, { useState, useEffect } from "react";

import MainView from "./MainView";
import { fetchPodcasts } from "./api";
import { transformPodcasts } from "./utils";

const AlbumView = () => {
  const [podcasts, setPodcasts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts()
      .then(res => {
        const transformedPodcasts = transformPodcasts(res);
        setPodcasts(transformedPodcasts);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setError(e);
      });
  }, []);

  return <MainView items={podcasts} error={error} loading={loading} />;
};

export default AlbumView;
