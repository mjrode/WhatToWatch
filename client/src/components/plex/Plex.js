import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlexTokenForm from './PlexTokenForm';
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
      </div>
    );
  }
}

function mapStateToProps({auth, plex}) {
  return {auth, mediaResponse: plex.mediaResponse};
}

export default connect(mapStateToProps)(Plex);
