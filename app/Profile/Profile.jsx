/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// User Profile Page
// immediate children components include
// -- ProfileBio, AddStuff, ProfileItemList

const React = require('react');
const ProfileBio = require('./profileBio.jsx');
const AddStuff = require('./addStuff.jsx');
const Bank = require('./bank.jsx');
const ProfileItemList = require('./profileItemList.jsx');
const Chatbox = require('../Chat/chatbox.jsx')


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      fbId: null,
      fbToken: null,
      image: null,
      name: null,
      email: null,
      password: null,
      street: null,
      city: null,
      state: null,
      zip: null,
      bio: null,
      rating: null,
      ratingCount: null,
      createdAt: null,
      updatedAt: null,
      listFlag: false,
      ownerId: this.props.userId,
      userId: null,
      chatComponent:'',
      borrowerName:''
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentWillMount() {
    this.populateProfile(this.props.id);
  }

  handleItemClick(borrowerId, borrowerName) {
    console.log("borrowerID is " + borrowerId + " borrowerName is " + borrowerName);
    this.setState({
      userId:borrowerId,
      borrowerName:borrowerName
    }, function() {
      this.setState({
        chatComponent: <Chatbox
          name={this.state.borrowerName}
          ownerId={this.state.userId}
          userId={this.state.ownerId}
          socket={this.props.socket}
        />
    })}.bind(this))
  }
  
  // Populate profile populates the profile page by querying the User table by Id.
  populateProfile(profileRoute) {
    fetch(`/api/profile/${profileRoute}`, { credentials: 'same-origin' })
      .then(profile => profile.json())
      .then(json => this.setState(json))
      .then(this.setState({
        listFlag: !(this.state.listFlag),
      }));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 sub-component">
            <section className="spacer" />
            <ProfileBio
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              fullName={this.state.fullName}
              email={this.state.email}
              bio={this.state.bio}
              rating={this.state.rating}
              city={this.state.city}
              state={this.state.state}
              zip={this.state.zip}
              image={this.state.image}
              userId={this.props.id}
              populateProfile={this.populateProfile.bind(this)}
            />
          </div>
          <div className="col-lg-4">
            <AddStuff userId={this.state.id} populateProfile={this.populateProfile.bind(this)} />
            <Bank userId={this.state.id} />
          </div>
          <div className="col-lg-5">
            {this.state.id &&
              <ProfileItemList
                populateProfile={this.populateProfile.bind(this)}
                userId={this.state.id}
                flag={this.state.listFlag}
                handleItemClick={this.handleItemClick}
              />
            }
          </div>
        </div>
      <div className="row">
        <div className="col-lg-9">
        {this.state.chatComponent}
        </div>
      </div>
    </div>  
    );
  }
}

module.exports = Profile;
