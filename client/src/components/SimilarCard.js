import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Header from './helpers/Header';
import styles from '../css/materialize.css';
import {ToastContainer} from 'react-toastify';
import * as actions from '../actions';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

class MediaCard extends Component {
  renderContent() {
    if (
      this.props.loading &&
      this.props.currentShow === this.props.media.name
    ) {
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    }
  }
  renderToast() {
    if (this.props.currentShow === this.props.media.name) {
      return <ToastContainer />;
    }
  }
  renderButton(show) {
    if (this.props.sonarrApiKey && this.props.sonarrUrl) {
      return (
        <button
          className="waves-effect waves-light btn-large right Button margin-left"
          style={{backgroundColor: '#f9a1bc'}}
          type="submit"
          name="action"
          key={show.name}
          onClick={() => this.props.addSeries({showName: show.name})}
        >
          Add to Sonarr
          <i className="material-icons right">send</i>
        </button>
      );
    }
    return (
      <Link to="/sonarr" className="waves-effect waves-light btn-large right">
        <i className="material-icons right">send</i>Link Sonarr
      </Link>
    );
  }
  render() {
    const show = this.props.media;
    const isMobile = window.innerWidth < 480;
    if (!isMobile) {
      return (
        <div>
          {this.renderToast()}
          {this.renderContent()}
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
                    <h6 className="robots abs">
                      Rating: {` ${show.vote_average} `}| Popularity:{' '}
                      {` ${show.popularity}`}
                    </h6>

                    {this.renderButton(show)}
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
        <ToastContainer />
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
            <div className="card-action flex-center">
              <Link
                to={`/similar/${show.title}`}
                className="waves-effect waves-light btn-large center Button"
                style={{backgroundColor: '#f9a1bc'}}
                key={show.name}
                onClick={() => this.props.addSeries({showName: show.name})}
              >
                <i className="material-icons right">send</i>Add to Sonarr
              </Link>
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

function mapStateToProps(state) {
  return {
    loading: state.sonarr.loading,
    sonarrAddSeries: state.sonarr.sonarrAddSeries,
    currentShow: state.plex.currentShow,
    sonarrUrl: state.auth.sonarrUrl,
    sonarrApiKey: state.auth.sonarrApiKey,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(MediaCard));
