import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../css/materialize.css.js';
import axios from 'axios';
import MediaCard from './MediaCard';
import * as actions from '../actions';

class Similar extends Component {
  state = {tvShow: [], loading: false};

  componentDidMount() {
    this.getMostWatched();
  }

  getSimilar = async () => {
    const params = {mediaName: this.props.show.name, mediaType: 'show'};
    const res = await axios.get('/api/tdaw/similar', {params});
  };

  render() {
    console.log('My state--', this.state);
    const mediaList = this.state.tvShowList.map(show => {
      return (
        <div className="row" key={show.title}>
          <MediaCard media={show} />
        </div>
      );
    });
    return <div>{mediaList}</div>;
  }
}

Similar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({plex}) {
  console.log('plex props', plex);
  return {loading: plex.loading};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(Similar));
