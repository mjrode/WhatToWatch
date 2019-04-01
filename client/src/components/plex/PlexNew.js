import React, {Component} from 'react';
import PlexActions from './PlexActions';
import PlexForm from './PlexForm';
import {connect} from 'react-redux';

class PlexNew extends Component {
  submit = values => {
    this.props.fetchPlexToken(values.username, values.password);
  };
  render() {
    console.log(this.props.auth);
    if (!this.props.auth.plexToken) {
      return <PlexForm onSubmit={this.submit} />;
    }

    return <PlexActions />;
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(PlexNew);
