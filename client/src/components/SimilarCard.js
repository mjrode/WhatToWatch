import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Header from './helpers/Header';
import styles from '../css/materialize.css';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MediaCard extends Component {
  state = {response: ''};
  addShow = async () => {
    const params = {showName: this.props.media.name};
    const res = await axios.get('/api/sonarr/add-show', {params});
    console.log(res);
    const response =
      typeof res.data === 'string'
        ? res.data
        : 'Successfully added ' + res.data.title;
    this.setState({response: response});
  };

  render() {
    const show = this.props.media;
    const isMobile = window.innerWidth < 480;
    console.log(this.state);
    if (this.state.response.length > 1) {
      toast(this.state.response);
    }
    if (!isMobile) {
      return (
        <div>
          <div className="row hide-mobile">
            <ToastContainer />
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
                    <button
                      className="btn-large waves-effect waves-light center-align"
                      type="submit"
                      name="action"
                      onClick={this.addShow}
                    >
                      Add to Sonarr
                      <i className="material-icons right">send</i>
                    </button>
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
