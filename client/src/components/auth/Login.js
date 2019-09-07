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

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onFormSubmit = event => {
    event.preventDefault();
    console.log('loginuserstate', this.state);
    this.loginUser(this.state);
  };

  loginUser = async params => {
    console.log('params', params);
    const res = await axios({
      method: 'post',
      url: '/api/auth/login',
      data: params,
    });
    console.log('login response', res.data);
  };

  render() {
    const {classes} = this.props;
    if (this.props.auth) {
      return <Redirect to="/" />;
    } else if (!this.props.auth) {
      return (
        <React.Fragment>
          <CssBaseline />
          <div className={classes.heroUnit}>
            <div className={classes.heroContentSmall}>
              <div className="section center-align">
                <div className={classes.shrinkTopMargin}>
                  <TextHeader text="Login" />
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
                        <p>Email</p>
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
                        <p>Password</p>
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
                            Login
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(Login));
