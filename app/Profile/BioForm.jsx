/* eslint react/prop-types: 0 */
/*  global fetch:false  */

// Bio Form allows user to edit their profile info.
// updateUser is the fetch that updates the user on the db, and triggers
// toggleEditing (passed down from ProfileBio) which changes the profileBio's
// state.editing back to false, causing a rerender back to the BioText. 

const React = require('react');

class BioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateUser = (e) => {
      e.preventDefault();
      const info = {
        //Added Image
        image: this.image.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        bio: this.bio.value,
        city: this.city.value,
        state: this.state.value,
        zip: this.zip.value,
        user_id: this.props.userId,
      };
      fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(info),
      })
        .then(this.props.toggleEditing);
    };
  }
  render() {
    return (
      <div className="sub-component">
        <h2>Update Profile</h2>
        <form onSubmit={e => this.updateUser(e)}>
          <label htmlFor="title">Image</label>
          <input
            type="text"
            className="form-control"
            name="image"
            defaultValue={this.props.image}
            ref={(input) => { this.image = input; }}
          />
          <label htmlFor="title">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            defaultValue={this.props.firstName}
            ref={(input) => { this.firstName = input; }}
          />
          <label htmlFor="title">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            defaultValue={this.props.lastName}
            ref={(input) => { this.lastName = input; }}
          />
          <label htmlFor="title">email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            defaultValue={this.props.email}
            ref={(input) => { this.email = input; }}
          />
          <label htmlFor="title">Bio</label>
          <input
            type="text"
            className="form-control"
            name="bio"
            defaultValue={this.props.bio}
            ref={(input) => { this.bio = input; }}
          />
          <label htmlFor="title">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            defaultValue={this.props.city}
            ref={(input) => { this.city = input; }}
          />
          <label htmlFor="title">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            defaultValue={this.props.state}
            ref={(input) => { this.state = input; }}
          />
          <label htmlFor="title">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zip"
            defaultValue={this.props.zip}
            ref={(input) => { this.zip = input; }}
          />
          {
            this.props.userId && <input
              type="hidden"
              className="form-control"
              value={this.props.userId}
              name="user_id"
            />
          }
          <button type="submit" className="btn btn-warning btn-md">Update Profile</button>
        </form>
      </div>
    );
  }
}
module.exports = BioForm;
