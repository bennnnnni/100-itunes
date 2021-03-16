import React from "react";

import { useDispatch } from "react-redux";

import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAuth0 } from "@auth0/auth0-react";
import { updateAlbum, updatePodcast } from "../redux/actionCreators";
import { isAlbum, isPodcast } from "../utils";

import "./ResultItem.scss";

const ResultItem = ({ result }) => {
  const dispatch = useDispatch();
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
      <div className="img-container" data-testid="card-image">
        <img src={result.img} alt="" />
        {isAuthenticated && (
          <Checkbox
            checked={result.fav}
            className="img-checkbox"
            color="secondary"
            size="medium"
            icon={<FavoriteBorderIcon color="secondary" fontSize="large" />}
            checkedIcon={<FavoriteIcon color="secondary" fontSize="large" />}
            onChange={
              isAlbum(result)
                ? () =>
                    dispatch(updateAlbum({ id: result.id, fav: !result.fav }))
                : isPodcast(result)
                ? () =>
                    dispatch(updatePodcast({ id: result.id, fav: !result.fav }))
                : null
            }
          />
        )}
      </div>
      <p className="result-title">{result.name}</p>
      <p className="result-artist">{result.artist}</p>
    </div>
  );
};

export default ResultItem;
