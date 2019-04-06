import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from './css';
import axios from 'axios';

class ImportLibrary extends Component {
  importPlexLibrary = async params => {
    const res = await axios.get('/api/plex/import/all');
    console.log(res);
    return res;
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <main>
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  PlexRex
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Media recommendations based on your most watched Plex TV and
                  Movies.
                </Typography>
                <div className="center-align">
                  <button
                    onClick={this.importPlexLibrary}
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

ImportLibrary.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(ImportLibrary));
