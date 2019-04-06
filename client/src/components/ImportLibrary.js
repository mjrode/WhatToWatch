import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ImportLibrary extends Component {
  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(ImportLibrary);
