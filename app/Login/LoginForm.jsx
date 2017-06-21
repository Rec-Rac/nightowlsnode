/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// Popup form for signing up with email
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
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(info),
      })
        .then(resp => resp.json())
        .then((resp) => {
          if (!resp.success) {
            this.setState({ message: resp.message });
          } else {
            this.props.methods.updateUser(resp.profile);
          }
        });
      this.clearField();
    };
  }
  render() {
    let message = null;
    if (this.state.message) {
      message = <div className="alert alert-danger">{this.state.message}</div>;
    }
    return (
      <div className="container">
        <div className="col-sm-6 col-sm-offset-3">
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
            <button type="submit" className="btn btn-warning btn-lg">Login</button>
          </form>
          <hr />
          <p>Need an account? <a href="/login">Login</a></p>
        </div>
      </div>
    );
  }
}

module.exports = LoginForm;
