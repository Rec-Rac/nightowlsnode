import {
  Route,
  Redirect,
} from 'react-router-dom';

const React = require('react');
const Auth = require('./lib/helpers').Auth;


module.exports = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      Auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />
      )
    )}
  />
);
