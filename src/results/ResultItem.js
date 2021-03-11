import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAuth0 } from "@auth0/auth0-react";

import "./ResultItem.scss";

const ResultItem = ({ result }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="result-card">
      <div className="card-header">
        <div className="result-rank">
          <p>{result.rank}</p>
        </div>
        <p className="card-header-content">{result.genre}</p>
        <p className="card-header-content">{result.year}</p>
      </div>
      <div className="img-container">
        <img src={result.img} alt="" />
        {isAuthenticated && (
          <Checkbox
            className="img-checkbox"
            color="secondary"
            size="medium"
            icon={<FavoriteBorderIcon color="secondary" fontSize="large" />}
            checkedIcon={<FavoriteIcon color="secondary" fontSize="large" />}
          />
        )}
      </div>
      <p className="result-title">{result.name}</p>
      <p className="result-artist">{result.artist}</p>
    </div>
  );
};

export default ResultItem;
