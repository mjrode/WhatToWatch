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
  componentDidMount() {
    this.props.getMostWatched();
    console.log(this.state);
    console.log('props', this.props.tvShowList);
  }
  // getMostWatched = async params => {
  //   const res = await axios.get('/api/recommend/most-watched');
  //   this.setState({tvShowList: res.data});
  // };

  render() {
    console.log('RENDER---', this.props.tvShowList);
    if (this.props.tvShowList) {
      const mediaList = this.props.tvShowList.map(show => {
        console.log('show-------', show);
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
    return <div>Loading</div>;
  }
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log('WHAT AMI!', state);
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
