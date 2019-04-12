import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Header from './helpers/Header';
import styles from '../css/materialize.css';
import {Link} from 'react-router-dom';
class MediaCard extends Component {
  render() {
    console.log('ccccccccc', this.props.media);
    const show = this.props.media;
    const isMobile = window.innerWidth < 480;
    if (!isMobile) {
      return (
        <div>
          <div className="row hide-mobile">
            <div className="col s12 ">
              <div className="card medium horizontal">
                <div
                  className="card-image"
                  style={{
                    boxShadow:
                      '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                    alt="pic"
                    className="circle"
                  />
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <div className="header">
                      <Header text={show.name} />
                    </div>
                    <p>{show.overview}</p>
                  </div>
                  <div className="card-action">
                    <i className="material-icons left">live_tv</i>Rating:
                    {` ${show.vote_average}`} Popularity:{' '}
                    {` ${show.popularity}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row hide-desktop">
        <div className="col s12 m12">
          <div className="card ">
            <div
              className="card-image"
              style={{
                boxShadow:
                  '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                alt="pic"
                className="circle"
              />
            </div>
            <div className="card-content">
              <p>{show.overview}</p>
            </div>
            <div className="card-action">
              {' '}
              <div className="card-action">
                <i className="material-icons left">live_tv</i>Rating:
                {` ${show.vote_average}`} Popularity: {` ${show.popularity}`}
              </div>
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
