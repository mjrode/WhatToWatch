import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import './CreateAccount.css';
import Modal from './Modal';
import styles from './css';

class CreateAccount extends React.Component {
  state = {email: '', password: '', plexUrl: ''};

  onFormSubmit = event => {
    event.preventDefault();
    this.getPlexToken(this.state);
  };

  getPlexToken = async params => {
    const res = await axios.get('/api/plex/token', {params});
    console.log(res);
    return res;
  };

  fetchSections = async params => {
    const res = await axios.get('/plex/library/sections');
    console.log(res);
    this.setState({section_data: res.data});
  };

  render() {
    const {classes} = this.props;
    if (!this.props.auth) {
      return (
        <div>
          <div>
            <h2>You need to be logged in to do that.</h2>
          </div>
        </div>
      );
    } else if (this.props.auth) {
      return (
        <React.Fragment>
          <CssBaseline />
          <div className={classes.heroUnit}>
            <div className={classes.heroContentSmall}>
              <div className="section center-align">
                <h3 className={classes.shrinkTopMargin}>Fetch Plex Token</h3>
                <div className="center">
                  <Modal />
                </div>
              </div>
              <div className="section center-align">
                <div className="row">
                  <form onSubmit={this.onFormSubmit} className="col s12">
                    <div className="row no-bottom-margin">
                      <div className="input-field col m8 offset-m2 s12">
                        <p>Plex Email</p>
                        <input
                          id="email"
                          type="text"
                          className="validate center-align"
                          value={this.state.email}
                          onChange={e => this.setState({email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="row no-bottom-margin">
                      <div className="input-field col m8 offset-m2 s12">
                        <p>Plex Server URL</p>
                        <input
                          id="plexUrl"
                          type="text"
                          className="validate center-align"
                          value={this.state.plexUrl}
                          onChange={e =>
                            this.setState({plexUrl: e.target.value})
                          }
                        />
                      </div>
                    </div>
                    <div className="row no-bottom-margin">
                      <div className="input-field col m8 offset-m2 s12">
                        <p>Plex Password</p>
                        <input
                          id="password"
                          type="password"
                          className="validate center-align"
                          value={this.state.password}
                          onChange={e =>
                            this.setState({password: e.target.value})
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <div className="center-align">
                          <button
                            className="btn-large waves-effect waves-light center-align"
                            type="submit"
                            name="action"
                          >
                            Submit
                            <i className="material-icons right">send</i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(CreateAccount));
