import React from "react";

import { useSelector } from "react-redux";

import AlbumView from "./AlbumView";
import Navigation from "./Navbar/Navbar";
import PodcastView from "./PodcastView";
import { appViews } from "./constants";

const { ALBUMS, PODCASTS, FAVORITES } = appViews;

function App() {
  const currentView = useSelector(state => state.appState.currentView);

  const renderCorrectView = () => {
    if (currentView === ALBUMS) {
      return <AlbumView />;
    }
    if (currentView === PODCASTS) {
      return <PodcastView />;
    }
    if (currentView === FAVORITES) {
      return null;
    }
    return <AlbumView />;
  };

  return (
    <div>
      <Navigation />
      {renderCorrectView()}
    </div>
  );
}

export default App;
