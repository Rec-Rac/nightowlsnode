const React = require('react');

class Chatbox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      message: "",
      messages: [],
      ownerId: this.props.ownerId,
      userId: this.props.userId
    }
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
     this.props.socket.on('chat message', function(msg){
       fetch(`/messages/${this.state.userId}/${this.state.ownerId}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({messages: responseJson});
        })
        .catch((error) => {
          console.error(error);
        });
    }.bind(this));
    return fetch(`/messages/${this.state.userId}/${this.state.ownerId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson ", responseJson);
        this.setState({messages: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
      //add socket event listener
  }  

  handleMessageSubmit(e){
    e.preventDefault()
    const message = this.state.message;
    const user = this.state.userId;
    const owner = this.state.ownerId;
    const data = { text: message, user_id: user, owner_id: owner }
    console.log("data on line 34 of chatbox.jsx is ", data)
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      this.props.socket.emit('client:sendMessage', this.state.message);
      this.setState({message:""});
    }).then(() => {
      fetch(`/messages/${this.state.userId}/${this.state.ownerId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson ", responseJson);
        this.setState({messages: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
    }) 
  }

  handleChange(e) {
    console.log(e.target.value);
      this.setState({message:e.target.value})
  }
 
  render(){
   return ( 
   <div className="card-block col-md-9"> 
      <h4 className="card-title">Chat with {this.props.name}</h4>
      <ul id="messages" className="list-group messages-list">
        {(this.state.messages.length > 0) && this.state.messages.map(newMessage => (
          <li key={newMessage.id} className="list-group-item">
          <span className="badge badge-default badge-pill">{newMessage.borrower.fullName}<br/>
            <small>  {new Date(newMessage.createdAt).toLocaleString()}</small>
          </span>
          {newMessage.text}
          </li>
        ))}
      </ul>
      <form className="form-group" onSubmit={this.handleMessageSubmit}>
        <div className="input-group">
        <input id="m" autocomplete="off" type="text" className="form-control"  value={this.message} onChange={this.handleChange} />
        <span className="input-group-btn">
           <button className="btn btn-secondary" type="submit" value="Submit">Send</button>
         </span>  
       </div>
      </form>
    </div>  
  )
  }
 }    
module.exports = Chatbox;
