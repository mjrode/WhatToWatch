import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
// Utils

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      props.auth !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
