import React from "react";

import "./ResultItem.scss";

const ResultItem = ({ result }) => {
  return (
    <div className="result-card">
      <div className="card-header">
        <div className="result-rank">
          <p>{result.rank}</p>
        </div>
        <p className="card-header-content">{result.genre}</p>
        <p className="card-header-content">{result.year}</p>
      </div>
      <img src={result.img} alt="" />
      <p className="result-title">{result.name}</p>
      <p className="result-artist">{result.artist}</p>
    </div>
  );
};

export default ResultItem;
