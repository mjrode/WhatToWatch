import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
      <div>
        <div className="row">
          <a
            href="/api/auth/google"
            className="waves-effect waves-light btn-large min-button-width"
          >
            <i className="material-icons left">group</i> Login with Google
          </a>
        </div>
        <div className="row">
          <Link
            to="/login"
            className="waves-effect waves-light btn-large min-button-width"
          >
            <i className="material-icons left">show_chart</i>Login
          </Link>
        </div>
        <div className="row">
          <Link
            to="/sign-up"
            className="waves-effect waves-light btn-large min-button-width"
          >
            <i className="material-icons left">show_chart</i>SignUp
          </Link>
        </div>
      </div>
    );
};
export default Auth;
