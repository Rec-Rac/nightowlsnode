/*  global fetch:false  */

// Search Bar Component for Searching for items from the database
// Calls SearchBar.jsx, Results.jsx, Map.jsx
// Also acts as the home page when there are no results in this.state.searchresults.

const React = require('react');
const Results = require('./Results.jsx');
const SearchBar = require('./SearchBar.jsx');
const Map = require('./map.jsx');
const Auth = require('../lib/helpers.js').Auth;


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      zip: '',
      searchResults: [],
      searchResultsFiltered: [],
      location: null,
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleBorrow = this.handleBorrow.bind(this);
  }

  handleSearchInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleButtonClick(evt) {
    if (evt.target.name === 'all') {
      this.setState({ searchResultsFiltered: this.state.searchResults });
    }
    if (evt.target.name === 'available') {
      const filteredResults = this.state.searchResults.filter(item => item.borrower_id === null);
      this.setState({ searchResultsFiltered: filteredResults });
    }
  }

  handleSearch() {
    const searchString = this.state.search;
    const zipString = this.state.zip;
    const queryStringUrl = `/search?item=${searchString}&zip=${zipString}`;
    fetch(queryStringUrl, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(({ location, items }) => {
        if (location) {
          items.sort((item1, item2) => item1.distance - item2.distance);
          this.setState({ location });
        }
        this.setState({ searchResults: items, searchResultsFiltered: items });
      });
  }

  handleBorrow(itemId, ownerId) {
    if (!Auth.isAuthenticated) {
      this.props.appMethods.goTo('/login');
      return;
    }

    const borrowerId = this.props.id;
    const data = { userID: borrowerId, id: itemId, owner: ownerId};
    fetch('/api/borrow', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then(() => this.handleSearch());
  }




  render() {
    const { searchResultsFiltered, location } = this.state;
    if (!this.state.searchResults.length) {
      // HOMEPAGE
      return (
        <div id="homepage">
          <div id="homeContainer" className="container">
            <div className="text-center">
              <h1 id="title">SHAREin</h1>
            </div>
            <div className="row" />
            <SearchBar
              handleSearchInputChange={this.handleSearchInputChange}
              handleSearch={this.handleSearch}
            />
          </div>
        </div>
      );
    }
    // SEARCH RESULTS PAGE
    return (
      <div className="container">
        <SearchBar
          handleSearchInputChange={this.handleSearchInputChange}
          handleSearch={this.handleSearch}
        />
        <section className="spacer" />
        <div className="col-md-8">
          <div className="row" />
          <div className="row">
            <Results
              userId={this.props.id}
              socket={this.props.socket}
              searchResults={searchResultsFiltered}
              handleButtonClick={this.handleButtonClick}
              handleBorrow={this.handleBorrow}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="row" />
          <Map searchResults={searchResultsFiltered} location={location} />
        </div>
      </div>
    );
  }
}
module.exports = Search;
