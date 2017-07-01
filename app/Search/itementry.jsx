// Conditionally rendering items based on availablility
// holds and displays the user rating attached to each item
// Item .distance is in meters. Converted to miles in line on this component;
const React = require('react');
const Rating = require('react-rating');
const Chatbox = require('../Chat/chatbox.jsx')

class ItemEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  
  render(){
   return ( 
    <div> 
      <div className="row">
        <div className="col-md-3">
          <img className="img-responsive" src={this.props.item.image} alt={this.props.item.title} />
        </div>
        <div className="card-block col-md-6">
          <h4 className="card-title">{this.props.item.title}</h4>
          <p className="card-text">{this.props.item.itemDescription}</p>
          <p className="card-text">Price: {this.props.item.price} $</p>
          {(this.props.item.distance) && <p className="card-text">
            <em>About {(this.props.item.distance * 0.0006214).toFixed(1)} miles from your location</em></p>}
          {(!this.props.item.borrower_id)
            ? <button className="btn btn-primary" onClick={() => this.props.handleBorrow(this.props.item.id, this.props.item.owner_id)}>Borrow</button>
            : <button className="btn btn-primary disabled">Unavailable</button>
          } 
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <img
            className="img-responsive"
            src={this.props.item.owner.image}
            alt=""
          />
          <Rating
            initialRate={this.props.item.owner.rating}
            readonly
            empty={<img src="assets/star-grey.png" className="icon" alt="C'mon Son" />}
            full={<img src="assets/star-yellow.png" className="icon" alt="C'mon Son" />}
          />
        </div>
        <Chatbox
          name={this.props.item.owner.firstName}
          ownerId={this.props.item.owner.id}
          userId={this.props.userId}
          socket={this.props.socket}
        />
      </div>
    </div>
   ) 
  }
}  


module.exports = ItemEntry;
