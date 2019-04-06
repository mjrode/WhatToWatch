import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from './css';
import axios from 'axios';
import MediaCard from './MediaCard';

class MediaList extends Component {
  state = {tvShowList: []};

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

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(MediaList));
