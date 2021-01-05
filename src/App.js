import React, { useState } from "react";

import AlbumView from "./AlbumView";
import Navigation from "./Navbar/Navbar";
import PodcastView from "./PodcastView";

function App() {
  const [currentView, setCurrentView] = useState("albums");

  const renderCorrectView = () => {
    if (currentView === "albums") {
      return <AlbumView />;
    }
    if (currentView === "podcasts") {
      return <PodcastView />;
    }
    return <AlbumView />;
  };

  return (
    <div>
      <Navigation selectView={setCurrentView} />
      {renderCorrectView()}
    </div>
  );
}

export default App;
