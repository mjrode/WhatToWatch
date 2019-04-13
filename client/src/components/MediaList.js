import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../css/materialize.css.js';
import MediaCard from './MediaCard';
import * as actions from '../actions';

class MediaList extends Component {
  componentDidMount() {
    this.props.getMostWatched();
  }

  render() {
    if (this.props.tvShowList) {
      const mediaList = this.props.tvShowList.map(show => {
        return (
          <div className="row" key={show.title}>
            <MediaCard media={show} />
          </div>
        );
      });
      return <div>{mediaList}</div>;
    }
    return <div>Loading...</div>;
  }
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.plex.loading,
    plexToken: state.plex.plexToken,
    tvShowList: state.plex.tvShowList,
    mediaResponse: state.plex.mediaResponse,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(MediaList));
