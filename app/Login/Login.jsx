// login component
/* eslint react/prop-types: 0 */

// login popup - holds an options template in the constructor
// and calls signup or input form based on the response to that template

import { Redirect } from 'react-router-dom';

const React = require('react');
const LoginForm = require('./LoginForm.jsx');
const SignupForm = require('./SignupForm.jsx');
const Auth = require('../lib/helpers').Auth;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
      from: null, // was used for front-end redirecting (currently broken)
      redirectToReferrer: false, // same as above
      userId: null,
    };
    this.methods = {
      chooseSignup: () => this.setState({ form: 'Signup' }),
      chooseLogin: () => this.setState({ form: 'Login' }),
      login: (userId) => {
        Auth.isAuthenticated = true;
        this.setState({ userId, redirectToReferrer: true });
        this.props.appMethods.loggedIn();
      },
      // login/signup HTML template
      loginOptions: () => (<div>
        <h1>
          <span className="fa fa-lock" />
          WELCOME!
        </h1>
        <p>I am the gatekeeper.</p>
        <p>Are you the keymaster?</p>

        <button
          className="btn btn-default"
          onClick={e => this.methods.chooseLogin(e)}
        >
          Local Login
        </button>

        <button
          className="btn btn-default"
          onClick={e => this.methods.chooseSignup(e)}
        >
          Local Signup
        </button>
      </div>),
    };
  }
  componentWillMount() {
    if (this.props.location) {
      this.setState({ from: this.props.location.state.from });
    } else {
      this.setState({ from: '/' });
    }
  }
  render() {
    const { redirectToReferrer } = this.state;
    let Form = null;
    if (this.state.form) {
      if (this.state.form === 'Login') {
        Form = (<LoginForm
          appMethods={this.props.appMethods}
          loginMethods={this.methods}
        />);
      } else {
        Form = (<SignupForm
          appMethods={this.props.appMethods}
          loginMethods={this.methods}
        />);
      }
    } else {
      Form = this.methods.loginOptions();
    }

    if (redirectToReferrer) {
      console.log(this.state.from);
      return ((this.state.from.pathname === '/profile')
        ? <Redirect to={`/profile/${this.state.userId}`} />
        : <Redirect to={this.state.from} />
      );
    }
    return (
      <div className="card-container">
        <div className="card text-left">
          {Form}
        </div>
      </div>
    );
  }
}

module.exports = Login;
