import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class PlexForm extends React.Component {
  state = {username: '', password: '', section_data: ''};

  onFormSubmit = event => {
    event.preventDefault();
    this.getPlexToken(this.state);
  };

  getPlexToken = async params => {
    const res = await axios.get('/plex/auth', {params});
    return res;
  };

  fetchSections = async params => {
    const res = await axios.get('/plex/library/sections');
    console.log(res);
    this.setState({section_data: res.data});
  };

  render() {
    console.log(this.props.auth);
    if (this.props.auth.plexToken) {
      return (
        <div className="input-field col s6">
          <button
            onClick={this.fetchSections}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Fetch Users
            <i className="material-icons right">send</i>
          </button>
          <div>{this.state.section_data}</div>
        </div>
      );
    }
    return (
      <div className="section">
        <div className="row">
          <form onSubmit={this.onFormSubmit} className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="username"
                  type="text"
                  className="validate"
                  value={this.state.username}
                  onChange={e => this.setState({username: e.target.value})}
                />
                <label htmlFor="username">Plex Username</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">lock_open</i>
                <input
                  id="password"
                  type="password"
                  className="validate"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
                />
                <label htmlFor="password">password</label>
              </div>
            </div>
            <div className="input-field col s6">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(PlexForm);
