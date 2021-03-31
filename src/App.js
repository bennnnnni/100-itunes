import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import AlbumView from "./AlbumView";
import Navigation from "./Navbar/Navbar";
import PodcastView from "./PodcastView";
import FavoritView from "./FavoritView";
import { appViews } from "./constants";
import { getUser } from "./api";

const { ALBUMS, PODCASTS, FAVORITES } = appViews;

function App() {
  const currentView = useSelector(state => state.appState.currentView);
  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    const getUserOrCreateNewUser = async () => {
      const data = await getUser("46");
      if (data.user) {
        // update all the favorites
        console.log("user exists");
      } else {
        // craete new user
        console.log("user doesnt exist");
      }
    };
    if (isAuthenticated) {
      getUserOrCreateNewUser();
    }
  });

  const renderCorrectView = () => {
    if (currentView === ALBUMS) {
      return <AlbumView />;
    }
    if (currentView === PODCASTS) {
      return <PodcastView />;
    }
    if (currentView === FAVORITES) {
      return <FavoritView />;
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
