import React, { useState, useEffect } from "react";

import MainView from "./MainView";
import { fetchAlbums } from "./api";
import { transformAlbums } from "./utils";

const AlbumView = () => {
  const [albums, setAlbums] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums()
      .then(res => {
        const transformedAlbums = transformAlbums(res);
        setAlbums(transformedAlbums);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setError(e);
      });
  }, []);

  return <MainView items={albums} error={error} loading={loading} />;
};

export default AlbumView;
