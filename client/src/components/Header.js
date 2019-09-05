import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../css/materialize.css';
class Header extends Component {
  renderContent() {
    const isMobile = window.innerWidth < 480;
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="signUp">
            <li>
              <a href="/api/auth/google">Login With Google</a>
            </li>
            <li>
              <Link to={'/sign-up'}>Sign Up</Link>
            </li>
          </div>
        );
      default:
        if (!isMobile) {
          return (
            <div className="hide-mobile">
              <li key="1" style={{margin: '0 10px'}}>
                <Link to={'/most-watched'}>Most Watched</Link>
              </li>
              <li key="2" style={{margin: '0 10px'}}>
                <Link to={'/popular'}>Popular</Link>
              </li>
              <li key="3" style={{margin: '0 10px'}}>
                <a href="/api/auth/logout">Logout</a>
              </li>
            </div>
          );
        }
    }
  }
  render() {
    return (
      <nav style={{backgroundColor: '#f9a1bc'}}>
        <div className="nav-wrapper" style={{margin: '0 10px'}}>
          <Link to={this.props.auth ? '/' : '/'} className="left brand-logo">
            WhatToWatch
          </Link>

          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(Header);
