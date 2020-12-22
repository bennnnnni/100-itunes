import React, { useState } from "react";

import MainView from "./MainView";
import Navigation from "./Navbar/Navbar";

function App() {
  const [currentView, setCurrentView] = useState("albums");

  console.log(currentView);

  const renderCorrectView = () => {
    if (currentView === "albums") {
      return <MainView />;
    }
    if (currentView === "podcasts") {
      return null;
    }
    return <MainView />;
  };

  return (
    <div>
      <Navigation selectView={setCurrentView} />
      {renderCorrectView()}
    </div>
  );
}

export default App;
