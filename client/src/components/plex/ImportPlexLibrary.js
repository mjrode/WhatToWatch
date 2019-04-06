import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import TextHeader from '../helpers/Header';
import styles from '../../css/materialize.css.js';
import '../../css/materialize.css';
import * as actions from '../../actions';

class ImportPlexLibrary extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <main className="padding-bottom-5">
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <TextHeader text="Most Watched TV Shows" />
                <div className="center-align">
                  <button
                    onClick={this.props.fetchMedia}
                    className="waves-effect waves-light btn-large"
                  >
                    <i className="material-icons left">live_tv</i> Update/Import
                    Library
                  </button>
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      </div>
    );
  }
}

ImportPlexLibrary.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(ImportPlexLibrary));
