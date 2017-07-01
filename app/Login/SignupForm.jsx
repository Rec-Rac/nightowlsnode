/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// Popup form for signing up with email
// Called by Login.jsx

const React = require('react');
const statesList = require('../lib/states.js');

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { statesList,
      phoneMessage: null,
      passwordMessage: null,
      fillMessage: null,
    };
    this.clearField = () => {
      this.firstName.value = '';
      this.lastName.value = '';
      this.email.value = '';
      this.password.value = '';
    };
    this.fieldSubmit = (e) => {
      e.preventDefault();

      // Error checking
      let stop = false;
      let phoneMessage = null;
      let passwordMessage = null;
      let fillMessage = null;
      const phone = this.phone.value.replace(/[^0-9]/gi, '');
      if (phone.length !== 10) {
        stop = true;
        phoneMessage = 'Please use a 10-digit phone number';
      }
      if (this.password.value !== this.passMatch.value) {
        stop = true;
        passwordMessage = 'These passwords do not match';
      }
      const info = {
        phone,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
        passMatch: this.passMatch.value,
        city: this.city.value,
        street: this.address.value,
        zip: this.zip.value,
        state: this.addState.value,
      };
      Object.entries(info).forEach((tuple) => {
        const value = tuple[1];
        if (!value) {
          fillMessage = 'Please fill all fields';
          stop = true;
        }
      });
      if (stop) {
        return this.setState({
          phoneMessage,
          passwordMessage,
          fillMessage,
        });
      }
      
      // api call
      fetch('/signup', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(info),
      })
        .then(resp => resp.json())
        .then((resp) => {
          this.props.appMethods.updateUser(resp.profile);
          this.props.loginMethods.login(resp.profile.id);
          this.clearField();
        });
    };
  }
  render() {
    let phoneMessage = null;
    let passwordMessage = null;
    let fillMessage = null;
    if (this.state.phoneMessage) {
      phoneMessage = (<div className="alert alert-danger col-md-6">
        {this.state.phoneMessage}
      </div>);
    }
    if (this.state.passwordMessage) {
      passwordMessage = (<div className="alert alert-danger col-md-12">
        {this.state.passwordMessage}
      </div>);
    }
    if (this.state.fillMessage) {
      fillMessage = (<div className="alert alert-danger col-md-12">
        {this.state.fillMessage}
      </div>);
    }
    return (
      <div className="">
        <div className="">
          <h1><span className="fa fa-sign-in" /> Signup</h1>
          <form onSubmit={e => this.fieldSubmit(e)} >
            <div className="row nomargin">
              <div className="col-sm-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  ref={(input) => { this.firstName = input; }}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  ref={(input) => { this.lastName = input; }}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                ref={(input) => { this.address = input; }}
              />
            </div>
            <div className="row nomargin">
              <div className="col-sm-6">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  ref={(input) => { this.city = input; }}
                />
              </div>
              <div className="col-sm-2">
                <label htmlFor="addState">State</label>
                <select
                  name="addState"
                  className="form-control"
                  ref={(input) => { this.addState = input; }}
                >
                  {this.state.statesList.map(state => (
                    <option key={state.abbrev}>{state.abbrev}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-2">
                <label htmlFor="zip">Zipcode</label>
                <input
                  type="text"
                  name="zip"
                  className="form-control"
                  ref={(input) => { this.zip = input; }}
                />
              </div>
            </div>
            <div className="row nomargin">
              <div className="col-sm-6">
                <label htmlFor="phone">Mobile Phone:</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  ref={(input) => { this.phone = input; }}
                />
              </div>
              {phoneMessage}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                ref={(input) => { this.email = input; }}
              />
            </div>
            {passwordMessage}
            <div className="row nomargin">
              <div className="col-sm-6">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  ref={(input) => { this.password = input; }}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="passMatch">Confirm Password</label>
                <input
                  type="text"
                  name="passMatch"
                  className="form-control"
                  ref={(input) => { this.passMatch = input; }}
                />
              </div>
            </div>
            {fillMessage}
            <button type="submit" className="btn btn-small">Signup</button>
          </form>
          <hr />
          <p>Already have an account?
            <button
              onClick={this.props.loginMethods.chooseLogin}
              className="btn btn-small"
            >Login</button>
          </p>
        </div>
      </div>
    );
  }
}

module.exports = SignupForm;
