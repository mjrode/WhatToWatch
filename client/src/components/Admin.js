import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import HeroSimple from './HeroSimple';
import * as actions from './../actions';
import Typography from '@material-ui/core/Typography';

class Admin extends Component {
   async componentDidMount() {
    await this.props.fetchUsers();
    console.log('mike--', this.props.auth)
  }
  render() {
    if (!this.props) {
      return;
    }
    if (!this.props.auth.admin) {
      console.log('where are my props', this.props)
      return <div><p>Checking for admin rights..</p></div>
    }
      console.log(this.props.auth);
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
              Select a user to login as &nbsp;
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
              A list of users
            </Typography>
          </div>
        </div>
      );
  }
}

function mapStateToProps({ auth }) {
  console.log('plex props', auth)
  return { auth };
}

export default connect(
  mapStateToProps,
  actions,
)(Admin)