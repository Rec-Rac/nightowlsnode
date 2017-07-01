// Component where users can add items available for borrowing
// Adding an item updates DB and triggers populate profile,
// which triggers an update of the useritems

/* eslint react/prop-types: 0 */
/*  global fetch:false  */


const React = require('react');

class AddStuff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      title: null,
      description: null,
      //Added Price
      price: null,
    };
    this.clearField = () => {
      this.image.value = '';
      this.title.value = '';
      this.description.value = '';
      //Added price
      this.price.value = '';
    };
    this.addItem = (e) => {
      e.preventDefault();
      const info = {
        image: this.image.value,
        title: this.title.value,
        description: this.description.value,
        //Added Price
        price: this.price.value,
        user_id: this.props.userId,
      };
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(info),
      })
        .then(() => this.props.populateProfile(this.props.userId))
        .then(() => this.clearField());
    };
  }
  //Added Price
  render() {
    return (
      <div className="sub-component">
        <h2>Add Stuff</h2>
        <form onSubmit={e => this.addItem(e)}>
          <label htmlFor="title">Image Url</label>
          <input
            type="text"
            className="form-control"
            name="image"
            ref={(input) => { this.image = input; }}
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            ref={(input) => { this.title = input; }}
          />
          <label htmlFor="title">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            ref={(input) => { this.description = input; }}
          />
          <label htmlFor="title">Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            ref={(input) => { this.price = input; }}
          />
          {
            this.props.userId && <input
              type="hidden"
              className="form-control"
              value={this.props.userId}
              name="user_id"
            />
          }
          <button type="submit" className="btn btn-warning btn-md">Add Item</button>
        </form>
      </div>
    );
  }
}

module.exports = AddStuff;
