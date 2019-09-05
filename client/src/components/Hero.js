import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from '../css/materialize.css';
import '../css/materialize.css';

class Hero extends Component {
  callToAction = () => {
    if (this.props.auth.email) {
      return (
        <div>
          <div className="row">
            <Link
              to="/most-watched"
              className="waves-effect waves-light btn-large min-button-width"
            >
              <i className="material-icons left ">live_tv</i>
              Most Watched
            </Link>
            <br />
          </div>
          <div className="row">
            <Link
              to="/popular"
              className="waves-effect waves-light btn-large min-button-width"
            >
              <i className="material-icons left">show_chart</i>Popular TV
            </Link>
          </div>
          <div className="row">
            <Link
              to="/top-rated"
              className="waves-effect waves-light btn-large min-button-width"
            >
              <i className="material-icons left">star_border</i>Top Rated TV
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <a
            href="/api/auth/google"
            className="waves-effect waves-light btn-large min-button-width"
          >
            <i className="material-icons left">group</i> Login with Google
          </a>
        </div>
        <div className="row">
          <Link
            to="/sign-up"
            className="waves-effect waves-light btn-large min-button-width"
          >
            <i className="material-icons left">show_chart</i>SignUp
          </Link>
        </div>
      </div>
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
                  src={
                    process.env.PUBLIC_URL + '/icons/facebook_cover_photo_2.png'
                  }
                  alt="logo"
                />
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Media recommendations based on your most watched Plex TV.
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
