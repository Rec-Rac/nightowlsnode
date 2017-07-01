/* eslint-env browser */
import {
  Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./Search/Search.jsx');
const Login = require('./Login/Login.jsx');
const PrivateRoute = require('./PrivateRoute.jsx');
const Auth = require('./lib/helpers').Auth;
const ProfileChecker = require('./profileChecker.jsx');

import io from 'socket.io-client';
let socket =  io('https://sharein.herokuapp.com/');
const Data = require('./Data.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginPage: false, profile: null, loggedIn: false };
    this.methods = {
      updateUser: profile => this.setState({ profile }),
      goTo: path => history.push(path),
      openLoginPage: () => this.setState({ loginPage: true }),
      loggedIn: () => this.setState({ loginPage: false, loggedIn: true }),
      logout: (e) => {
        e.preventDefault();
        fetch('/logout', { credentials: 'same-origin' })
          .then(Auth.isAuthenticated = false)
          .then(this.methods.goTo('/'))
          .then(this.setState({ profile: null, loggedIn: false }))
          .then(console.log(document.cokkie));
      },
      LoginRender: (moarProps) => {
        this.methods.openLoginPage();
        return (<Redirect to={{
          pathname: '/',
          state: { from: props.location },
        }}
        />);
      },
    };
  }
  componentWillMount() {
    fetch('/checkSession', { credentials: 'same-origin' })
      .then(resp => resp.json())
      .then((json) => {
        if (json.success) {
          Auth.isAuthenticated = true;
          this.methods.loggedIn();
          this.setState({ profile: json.profile });
        }
      });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.location) {
      this.setState({ loginPage: true });
    }
    return true;
  }

  render() {
    // dynamically change button based on loggedIn status
    const welcome = this.state.profile
      ? (<h2>Welcome, {this.state.profile.fullName}</h2>)
      : null;
    const logButton = this.state.loggedIn
      ? (<button
        onClick={this.methods.logout}
        className="btn"
      >Logout</button>)
      : (<button
        onClick={this.methods.openLoginPage}
        className="btn"
      >Login</button>);
    // conditionally render loginBox
    const LoginPage = this.state.loginPage ? <Login appMethods={this.methods} /> : null;
    const ProfileCheckerRender = (props) => {
      const userId = this.state.profile ? this.state.profile.id : 0;
      return (<ProfileChecker id={userId} params={props} socket={socket} />);
    };
    const DataRender = (props) => {
      return (<Data id={this.state.profile.id} params={props} />);
    };
    const profileLink = this.state.profile ? `/profile/${this.state.profile.id}` : '/profile/0';
    const searchRender  = (props) => {
      const userId = this.state.profile ? this.state.profile.id : null;
      const appMethods = this.methods;
      return (<Search id={userId} appMethods={appMethods} socket={socket} />);
    }

    return (
      <div>
        <Router history={history}>
          <div>
            <div>
              <div className="navbar-fixed-top navbar-color">
                <div className="navbar-inner pull-left">
                  {welcome}
                </div>
                <nav className="navbar-inner pull-right">
                  <Link to="/" className="btn">
                    HOME
                  </Link>
                  <Link to="/" className="btn">
                    RESULTS
                  </Link>
                  <Link to={profileLink} className="btn">
                    PROFILE
                  </Link>
                  {logButton}
                </nav>
              </div>
            </div>
            {LoginPage}
            <Switch style={{ marginTop: '10px' }}>
              <PrivateRoute path="/profile/:id" render={ProfileCheckerRender} />
              <PrivateRoute path="/data/:id" render={DataRender} />
              <Route path="/login" render={this.methods.LoginRender} />
              <Route path="/" render={searchRender} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('App'),
);

exports.history = history;
