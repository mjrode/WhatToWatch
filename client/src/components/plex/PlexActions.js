import React, {Component} from 'react';
import {connect} from 'react-redux';

class PlexActions extends Component {
  render() {
    return (
      <ul className="collection">
        <li className="collection-item avatar">
          <i className="material-icons circle teal">live_tv</i>
          <span className="title">TV</span>
          <p>Get TV show recommendations</p>
          <a href="#!" className="secondary-content">
            <i className="material-icons">grade</i>
          </a>
        </li>

        <li className="collection-item avatar">
          <i className="material-icons circle teal">local_movies</i>
          <span className="title">Movies</span>
          <p>Get Movie recommendations</p>
          <a href="#!" className="secondary-content">
            <i className="material-icons">grade</i>
          </a>
        </li>
      </ul>
    );
  }
}
function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(PlexActions);
