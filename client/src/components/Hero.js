import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from '../css/materialize.css';

class Hero extends Component {
  callToAction = () => {
    console.log('hero - props auth', this.props.auth.size);
    if (this.props.auth.email) {
      return (
        <Link to="/plex" className="waves-effect waves-light btn-large">
          <i className="material-icons left">live_tv</i>Get Started
        </Link>
      );
    }
    return (
      <a href="/api/auth/google" className="waves-effect waves-light btn-large">
        <i className="material-icons left">group</i> Login with Google
      </a>
    );
  };

  render() {
    const {classes} = this.props;

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
                <img
                  className="responsive-img"
                  src={process.env.PUBLIC_URL + '/icons/logo.png'}
                  alt="logo"
                />
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
              <div className="center-align">{this.callToAction()}</div>
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
