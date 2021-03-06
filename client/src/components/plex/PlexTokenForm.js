import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import '../../css/materialize.css';
import TextHeader from '../helpers/Header';
import styles from '../../css/materialize.css';

class PlexTokenForm extends React.Component {
  state = {
    email: '',
    password: '',
    sonarrUrl: '',
    sonarrApiKey: '',
    errorMessage: '',
    redirect: false,
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.getPlexToken(this.state);
  };

  getPlexToken = async params => {
    const res = await axios.get('/api/plex/token', {params});
    console.log('response', res.data);
    if (res.data.includes('Invalid')) {
      this.setState({errorMessage: res.data});
    } else {
      window.location.reload();
    }
  };

  render() {
    const {classes} = this.props;
    if (this.props.auth.sonarrUrl && this.props.auth.sonarrApiKey) {
      return <Redirect to="/" />;
    }
    if (!this.props.auth) {
      return <Redirect to="/" />;
    } else if (this.props.auth) {
      return (
        <React.Fragment>
          <CssBaseline />
          <div className={classes.heroUnit}>
            <div className={classes.heroContentSmall}>
              <div className="section center-align">
                <div className={classes.shrinkTopMargin}>
                  <TextHeader text="Connect to Sonarr" />
                </div>
                <hr />
                <div className="flex-center">
                  <h5 className="robots center ">{this.state.errorMessage}</h5>
                </div>
              </div>
              <div className="section center-align">
                <div className="row">
                  <form onSubmit={this.onFormSubmit} className="col s12">
                    <div className="row no-bottom-margin">
                      <div className="input-field col m8 offset-m2 s12">
                        <p>Sonarr Url</p>
                        <input
                          id="sonarrUrl"
                          type="text"
                          className="validate center-align"
                          value={this.state.sonarrUrl}
                          onChange={e =>
                            this.setState({sonarrUrl: e.target.value})
                          }
                        />
                      </div>
                    </div>

                    <div className="row no-bottom-margin">
                      <div className="input-field col m8 offset-m2 s12">
                        <p>Sonarr Api Key</p>
                        <input
                          id="sonarrApiKey"
                          type="text"
                          className="validate center-align"
                          value={this.state.sonarrApiKey}
                          onChange={e =>
                            this.setState({sonarrApiKey: e.target.value})
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

PlexTokenForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(PlexTokenForm));
