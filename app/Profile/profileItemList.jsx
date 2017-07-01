// Profile Item List Page
// Has Tabs for UserItemEntry(s).jsx and BorrowedItemEntry(s).jsx.
// Before it mounts it fetches Items table and adds user and
// borrowed items to state.


/*  global fetch:false  */
/* eslint react/prop-types: 0 */
import { withRouter } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const React = require('react');
const UserItemEntry = require('./userItemEntry.jsx');
const BorrowedItemEntry = require('./borrowedItemEntry.jsx');
const Transactions = require('./transactions.jsx');

class ProfileItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userItems: null,
      borrowedItems: null,
      transactions: null,
    };
    this.changeRoute = () => {
      this.props.history.push(`/data/${this.props.userId}/`);
      // this.props.populateProfile(this.props.userId);
    };
    this.fetchUserItems = this.fetchUserItems.bind(this);
  }

  componentWillMount() {
    this.fetchUserItems(this.props.userId);
    this.fetchBorrowedItems(this.props.userId);
    this.fetchTransactions(this.props.userId);
  }

  // Component should update if userId changes clicking on other user's profile
  // or if you add an item (changes flag on state in profile)
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.userId !== nextProps.userId || (this.props.flag !== nextProps.flag)) {
      this.fetchUserItems(nextProps.userId);
      this.fetchBorrowedItems(nextProps.userId);
    }
    return true;
  }
  fetchUserItems(route) {
    fetch(`/api/userItems/${route}`, { credentials: 'same-origin' })
      .then(items => items.json())
      .then(json => this.setState({
        userItems: json,
      }));
  }
  fetchBorrowedItems(route) {
    fetch(`/api/borrowedItems/${route}`, { credentials: 'same-origin' })
      .then(items => items.json())
      .then(json => this.setState({
        borrowedItems: json,
      }));
  }
  fetchTransactions(route) {
    fetch(`/api/userTransactions/${route}`, { credentials: 'same-origin' })
      .then(items => items.json())
      .then(json => this.setState({
        transactions: json
      }));
  }
  render() {
    return (
      <Tabs className="sub-component">
        <TabList>
          <Tab>My Stuff</Tab>
          <Tab>Borrowed</Tab>
          <Tab>Transactions</Tab>
        </TabList>
        <TabPanel>
          {this.state.userItems && this.state.userItems.map(item =>
            (<UserItemEntry
              image={item.image}
              ownerId={item.owner_id}
              itemId={item.id}
              title={item.title}
              description={item.itemDescription}
              borrower={item.borrower ? item.borrower.fullName : null}
              borrowerId={item.borrower_id ? item.borrower_id : null}
              populateProfile={this.props.populateProfile}
              fetchUserItems={this.fetchUserItems}
              fetchBorrowedItems={this.fetchBorrowedItems.bind(this)}
              handleItemClick={this.props.handleItemClick}
            />),
          )}
        </TabPanel>
        <TabPanel>
          {this.state.borrowedItems && this.state.borrowedItems.map(item =>
            (<BorrowedItemEntry
              image={item.image}
              title={item.title}
              description={item.itemDescription}
              owner={item.owner.fullName}
              ownerId={item.owner_id}
              populateProfile={this.props.populateProfile}
              handleItemClick={this.props.handleItemClick}
              history={this.props.history}
            />),
          )}
        </TabPanel>
        <TabPanel>
          <strong>Loans:</strong>
          <ul style={{'listStylePosition': 'inside','paddingLeft':0}}>
          {this.state.transactions && this.state.transactions.map(item => {
            if(item.owner_id === this.props.userId){
              return (<Transactions
                owner={item.owner.fullName}
                borrower={item.borrower.fullName}
                price={item.item.price}
                datetime={item.createdAt}
                title={item.item.title}
                bool={true}
                // populateProfile={this.props.populateProfile}
              />)
            }
          })}
          </ul>
          <strong>Borrows:</strong>
          <ul style={{'listStylePosition': 'inside','paddingLeft':0}}>
          {this.state.transactions && this.state.transactions.map(item => {
            if(item.borrower_id === this.props.userId){
              return (<Transactions
                owner={item.owner.fullName}
                borrower={item.borrower.fullName}
                price={item.item.price}
                datetime={item.createdAt}
                title={item.item.title}
                bool={false}
                // populateProfile={this.props.populateProfile}
              />)
            }
          })}
          </ul>
          <button onClick={this.changeRoute} className="btn btn-warning btn-md">More Details</button>
        </TabPanel>
      </Tabs>
    );
  }
}

const ProfileItemListWithRouter = withRouter(ProfileItemList);

module.exports = ProfileItemListWithRouter;
