import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from './css';
import axios from 'axios';

class MediaList extends Component {
  componentDidMount() {
    this.getMostWatched();
  }
  getMostWatched = async params => {
    const res = await axios.get('/api/recommend/most-watched');
    console.log(res);
    return res;
  };

  render() {
    const {classes} = this.props;
    return (
      <ul className="collection">
        <li className="collection-item avatar">
          <img src="images/yuna.jpg" alt="pic" className="circle" />
          <span className="title">Title</span>
          <p>
            First Line <br />
            Second Line
          </p>
          <a href="#!" className="secondary-content">
            <i className="material-icons">grade</i>
          </a>
        </li>
      </ul>
    );
  }
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(MediaList));
