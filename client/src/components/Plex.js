import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import PlexTokenForm from './PlexTokenForm';
import ImportLibrary from './ImportLibrary';

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
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(Plex);
