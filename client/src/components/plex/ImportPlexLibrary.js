import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../../css/materialize.css.js';
import '../../css/materialize.css';
import * as actions from '../../actions';

class ImportPlexLibrary extends Component {
  componentWillMount() {
    this.props.fetchMedia();
  }
  render() {
    return (
      <img
        className="responsive-img"
        src={process.env.PUBLIC_URL + '/icons/facebook_cover_photo_2.png'}
        alt="logo"
      />
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(ImportPlexLibrary));
