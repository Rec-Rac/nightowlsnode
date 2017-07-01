/* eslint react/prop-types: 0 */

// Parent compoenent that wraps the profile.
// Checks if the user is looking at their own profile, or someone else's,
// and renders private or public profile accordingly.

const PublicProfile = require('./Profile/PublicProfile/PublicProfile.jsx');
const PrivateProfile = require('./Profile/Profile.jsx');

const React = require('react');

class ProfileChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.id === Number(this.props.params.match.params.id)) {
      return (<PrivateProfile id={this.props.params.match.params.id} userId={this.props.id} socket={this.props.socket} />);
    }
    return (<PublicProfile id={this.props.params.match.params.id} userId={this.props.id} socket={this.props.socket}  />);
  }
}

module.exports = ProfileChecker;
