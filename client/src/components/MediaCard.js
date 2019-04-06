import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Header from './helpers/Header';
import styles from './css';

class MediaCard extends Component {
  render() {
    const show = this.props.media;
    return (
      <div className="col s12 ">
        <div className="card medium horizontal">
          <div className="card-image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt="pic"
              className="circle"
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <div className="header">
                <Header text={show.title} />
              </div>
              <p>{show.summary}</p>
            </div>
            <div className="card-action">
              <a href="www.google.com">Similar Shows</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(MediaCard));
