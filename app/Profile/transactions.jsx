const React = require('react');

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if(this.props.bool){
      return (
        <div>
          <li style={{'marginBottom':7, 'marginTop':7}}>{(new Date(this.props.datetime)).toLocaleString()}: <br/> Loaned {this.props.title} to {this.props.borrower} for {this.props.price} $ </li>
        </div> 
      );
    } else {
      return (
        <div>
          <li style={{'marginBottom':7, 'marginTop':7}}>{(new Date(this.props.datetime)).toLocaleString()}: <br/>  Borrowed {this.props.title} from {this.props.owner} for {this.props.price} $ </li>
        </div>
      );
    }
  }
}

module.exports = Transactions;
