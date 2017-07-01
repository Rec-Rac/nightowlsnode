/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// Popup form for signing up with email
// called by Login.jsx
const React = require('react');


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
    this.clearField = () => {
      this.email.value = '';
      this.password.value = '';
    };
    this.fieldSubmit = (e) => {
      e.preventDefault();
      const info = {
        email: this.email.value,
        password: this.password.value,
      };
      fetch('/login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(info),
      })
        .then((resp) => {
          console.log('pre-json', resp);
          return resp.json();
        })
        .then((resp) => {
          if (!resp.success) {
            this.setState({ message: resp.message });
          } else {
            console.log('pos', resp);
            this.props.appMethods.updateUser(resp.profile);
            this.props.loginMethods.login(resp.profile.id);
            this.clearField();
          }
        });
    };
  }
  render() {
    let message = null;
    if (this.state.message) {
      message = <div className="alert alert-danger">{this.state.message}</div>;
    }
    return (
      <div className="">
        <div className="">
          <h1><span className="fa fa-sign-in" /> Login</h1>
          {message}
          <form onSubmit={e => this.fieldSubmit(e)} >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                ref={(input) => { this.email = input; }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                className="form-control"
                ref={(input) => { this.password = input; }}
              />
            </div>
            <button type="submit" className="btn btn-small">Login</button>
          </form>
          <hr />
          <p>Already have an account?
            <button
              onClick={this.props.loginMethods.chooseSignup}
              className="btn btn-small"
            >Signup</button>
          </p>
        </div>
      </div>
    );
  }
}

module.exports = LoginForm;
