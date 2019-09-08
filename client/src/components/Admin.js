import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import HeroSimple from './HeroSimple';
import * as actions from './../actions';
import Typography from '@material-ui/core/Typography';

class Admin extends Component {
  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchUsers();
    console.log('users--', this.props.auth.users);
    console.log('user--', this.props.auth.user);
  }

  loginAsUser = async userForSignIn => {
    console.log('I was clicked and got a user', userForSignIn);

    console.log('params', userForSignIn);
    const res = await axios({
      method: 'post',
      url: '/api/auth/fake-session',
      data: {
        email: userForSignIn.email,
        password: this.props.auth.admin,
      },
    });
    console.log('login response', res.data);
  };

  renderUsers() {
    if (this.props.auth.users) {
      const usersList = this.props.auth.users.map(user => {
        return (
          <Typography
            variant="h2"
            key={user.email}
            align="center"
            color="textSecondary"
            paragraph
            className="z-depth-2 code"
          >
            <button
              onClick={() => this.loginAsUser(user)}
              className=""
            >
              {user.email}
            </button>
          </Typography>
        );
      });
      return <div>{usersList}</div>;
    }
  }
  render() {
    if (!this.props) {
      return;
    }

    if (!this.props.auth.admin) {
      console.log('checking for admin rights', this.props.auth);
      return (
        <div>
          <p>Checking for admin rights..</p>
        </div>
      );
    }
    console.log(this.props.auth);
    return (
      <div>
        <HeroSimple />

        <div className="row flex-center">{this.renderUsers()}</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  console.log('plex props', auth);
  return { auth };
}

export default connect(
  mapStateToProps,
  actions,
)(Admin);
