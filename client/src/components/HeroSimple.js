import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../css/materialize.css';
import '../css/materialize.css';

class HeroSimple extends Component {
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
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

HeroSimple.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(HeroSimple));
