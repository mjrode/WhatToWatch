import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../css/materialize.css.js';
import axios from 'axios';
import SimilarCard from './SimilarCard';
import * as actions from '../actions';
class Similar extends Component {
  state = {
    shows: [],
  };
  componentDidMount() {
    this.getSimilar();
  }

  getSimilar = async () => {
    const params = {showName: this.props.match.params.show};
    const res = await axios.get('/api/moviedb/tv/similar', {params});
    const shows = res.data;
    this.setState({shows: shows});
  };

  render() {
    if (!this.props.auth) {
      return <Redirect to="/" />;
    }
    if (this.state.shows.length > 0) {
      const mediaList = this.state.shows.map((show, index) => {
        return <SimilarCard media={show} key={index} />;
      });
      return <div>{mediaList}</div>;
    }

    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }
}

function mapStateToProps({plex, auth, sonarr}) {
  return {loading: plex.loading, auth, sonarrAddSeries: sonarr.sonarrAddSeries};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(Similar));
