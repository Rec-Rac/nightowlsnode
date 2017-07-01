/* eslint react/prop-types: 0 */
// Component just for rendering user's profile info (static)

const React = require('react');
const Rating = require('react-rating');

const BioText = ({ image, fullName, email, bio, rating, city, state, zip }) => (
  <div>
    <img
      className="img-responsive"
      src={image}
      alt=""
    />
    <p>Name: {fullName}</p>
    <p>Email: {email}</p>
    <p>Bio: {bio}</p>
    <p>Address: {city}, {state}, {zip}</p>
    <div> Rating: {<Rating
      initialRate={rating}
      readonly
      empty={<img src="assets/star-grey.png" className="icon" alt="" />}
      full={<img src="assets/star-yellow.png" className="icon" alt="" />}
    />}
    </div>
  </div>
);

module.exports = BioText;
