import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlexTokenForm from './PlexTokenForm';
import {BrowserRouter, Route} from 'react-router-dom';
import ImportPlexLibrary from './ImportPlexLibrary';
import MediaList from '../MediaList';

class Plex extends Component {
  render() {
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

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(Plex);
