import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import styles from '../css/materialize.css';
import TvListButtons from './buttons/TvList';
import AuthButtons from './buttons/Auth';
import '../css/materialize.css';

class Hero extends Component {
  callToAction = () => {
    if (this.props.auth.email) {
      return <TvListButtons />;
    }
    return <AuthButtons />;
  };

  render() {
    const { classes } = this.props;

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
                    process.env.PUBLIC_URL +
                    '/icons/facebook_cover_photo_2.png'
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
                Media recommendations based on your most watched Plex
                TV.
              </Typography>
              <div className="center-align">
                {this.callToAction()}
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Hero));
