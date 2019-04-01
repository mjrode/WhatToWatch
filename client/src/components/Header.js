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
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        if (!this.props.auth.plexToken) {
          return (
            <li key="3" style={{margin: '0 10px'}}>
              <Link to="/app/plex" className="waves-effect waves-light btn">
                <i className="material-icons left">live_tv</i>Import Plex
              </Link>
            </li>
          );
        }
        return (
          <li key="2" style={{margin: '0 10px'}}>
            <a href="/auth/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{margin: '0 10px'}}>
          <Link to={this.props.auth ? '/' : '/'} className="left brand-logo">
            PlexRec
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
