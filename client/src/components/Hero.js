import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './css';

class Hero extends Component {
  render() {
    const {classes} = this.props;
    if (!this.props.auth.length !== 0) {
      return (
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
                  <Link
                    to="/plex-token"
                    className="waves-effect waves-light btn-large"
                  >
                    <i className="material-icons left">live_tv</i>Get Started
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      );
    }

    return (
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
                <a
                  href="/api/auth/google"
                  className="waves-effect waves-light btn-large"
                >
                  <i className="material-icons left">live_tv</i> Login with
                  Google
                </a>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(Hero));
