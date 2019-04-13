import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/api/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <div>
            <li key="1" style={{margin: '0 10px'}}>
              <Link to={'/most-watched'}>Most Watched</Link>
            </li>
            <li key="2" style={{margin: '0 10px'}}>
              <a href="/api/auth/logout">Logout</a>
            </li>
          </div>
        );
    }
  }
  render() {
    return (
      <nav style={{backgroundColor: '#f9a1bc'}}>
        <div className="nav-wrapper" style={{margin: '0 10px'}}>
          <Link to={this.props.auth ? '/' : '/'} className="left brand-logo">
            PlexRex
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
