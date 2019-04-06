import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from './css';
import axios from 'axios';

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
        <ul className="collection" key={show.title}>
          <li className="collection-item avatar">
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt="pic"
              className="circle"
            />
            <span className="title">{show.title}</span>
            <p>
              {show.summary}
              <br />
              Views: {show.views}
            </p>
            <a href="#!" className="secondary-content">
              <i className="material-icons">grade</i>
            </a>
          </li>
        </ul>
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