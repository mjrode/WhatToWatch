import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class PlexForm extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Import your Plex library!</h1>
        We will then be able to analyze your files and suggest new Movies and Tv
        shows based on what you watch.
      </div>
    );
  }
}

export default reduxForm({
  form: 'plexForm',
})(PlexForm);
