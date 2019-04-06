import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlexTokenForm from './PlexTokenForm';
import ImportLibrary from './ImportLibrary';
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
        <ImportLibrary />
        <MediaList />
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(Plex);
