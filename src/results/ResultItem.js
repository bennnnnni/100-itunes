import React from "react";

import "./ResultItem.scss";

const ResultItem = ({ result }) => {
  return (
    <div className="result-card">
      <div className="card-header">
        <div className="result-rank">
          <p>{result.rank}</p>
        </div>
        <p className="card-header-content">{result.category.attributes.term}</p>
        <p className="card-header-content">
          {result["im:releaseDate"].attributes.label.split(" ")[2]}
        </p>
      </div>
      <img src={result["im:image"][2].label} alt="" />
      <p className="result-title">{result["im:name"].label}</p>
      <p className="result-artist">{result["im:artist"].label}</p>
    </div>
  );
};

export default ResultItem;
