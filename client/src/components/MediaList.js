import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../css/materialize.css.js';
import axios from 'axios';
import MediaCard from './MediaCard';
import * as actions from '../actions';
import {BrowserRouter, Route} from 'react-router-dom';
import Similar from './plex/Similar';

class MediaList extends Component {
  state = {tvShowList: [], loading: false};

  componentDidMount() {
    this.getMostWatched();
  }
  getMostWatched = async params => {
    const res = await axios.get('/api/recommend/most-watched');
    this.setState({tvShowList: res.data});
  };

  render() {
    const mediaList = this.state.tvShowList.map(show => {
      return (
        <div className="row" key={show.title}>
          <Route
            path="/plex/similar"
            render={props => <Similar {...props} show={show} />}
          />
          <MediaCard media={show} />
        </div>
      );
    });
    return <div>{mediaList}</div>;
  }
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({plex}) {
  return {loading: plex.loading};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(MediaList));
