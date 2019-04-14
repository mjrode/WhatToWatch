import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlexTokenForm from './PlexTokenForm';
import {Link} from 'react-router-dom';
import ImportPlexLibrary from './ImportPlexLibrary';
import MediaList from '../MediaList';

class Plex extends Component {
  render() {
    if (!this.props) {
      return;
    }
    if (!this.props.auth.plexToken) {
      return (
        <div>
          <PlexTokenForm />
        </div>
      );
    }
    return (
      <div>
        <ImportPlexLibrary />
        <MediaList />
        <div className="row flex-center">
          <Link
            to="/"
            className="waves-effect waves-light btn-large min-button-width"
          >
            <i className="material-icons left">send</i>Get Started
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({auth, plex}) {
  return {auth, mediaResponse: plex.mediaResponse};
}

export default connect(mapStateToProps)(Plex);
