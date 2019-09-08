import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import HeroSimple from '../HeroSimple';
import * as actions from '../../actions';
import Typography from '@material-ui/core/Typography';

class PlexPin extends Component {
  async componentDidMount() {
    await this.props.fetchPin();
    await this.props.checkPlexPin();
  }
  render() {
    if (!this.props) {
      return;
    }
    if (this.props.auth.plexToken) {
      return <Redirect to="/most-watched" />;
    }
    if (!this.props.auth.plexToken) {
      console.log('mike--', this.props.auth);
      return (
        <div>
          <HeroSimple />

          <div className="row flex-center">
            <Typography
              variant="h4"
              align="center"
              color="textSecondary"
              paragraph
            >
              Enter the code below to link your account on &nbsp;
              <a href="https://plex.tv/link" target="_blank">
                plex.com/link.
              </a>
            </Typography>
          </div>
          <div className=" flex-center ">
            <Typography
              variant="h2"
              align="center"
              color="textSecondary"
              paragraph
              className="z-depth-2 code"
            >
              {this.props.auth.plexPin}
            </Typography>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row flex-center">
          <Link
            to="/"
            className="waves-effect waves-light btn-large min-button-width"
          >
            <i className="material-icons left">send</i>Get Started
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  console.log('auth state to prop', auth);
  return { auth };
}

export default connect(
  mapStateToProps,
  actions,
)(PlexPin);
