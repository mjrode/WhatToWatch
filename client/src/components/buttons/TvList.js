import React from 'react';
import { Link } from 'react-router-dom';

const TvListButtons = () => {
  return (
    <div>
      <div className="row">
        <Link
          to="/most-watched"
          className="waves-effect waves-light btn-large min-button-width"
        >
          <i className="material-icons left ">live_tv</i>
          Most Watched
        </Link>
        <br />
      </div>
      <div className="row">
        <Link
          to="/popular"
          className="waves-effect waves-light btn-large min-button-width"
        >
          <i className="material-icons left">show_chart</i>Popular TV
        </Link>
      </div>
      <div className="row">
        <Link
          to="/top-rated"
          className="waves-effect waves-light btn-large min-button-width"
        >
          <i className="material-icons left">star_border</i>Top Rated
          TV
        </Link>
      </div>
    </div>
  );
};
export default TvListButtons;
