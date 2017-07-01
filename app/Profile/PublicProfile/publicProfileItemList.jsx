// Public Profile Item List Page
// Has Tabs for UserItems and Borrowed Items.
// Before it mounts it fetches Items table and adds user and
// borrowed items to state.
// TODO: create components for itemListEntries

/*  global fetch:false  */
/* eslint react/prop-types: 0 */

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const React = require('react');
const PublicUserItemEntry = require('./publicUserItemEntry.jsx');

class PublicProfileItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userItems: null,
    };
  }

  componentWillMount() {
    this.fetchUserItems(this.props.userId);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.userId !== nextProps.userId) {
      this.fetchUserItems(nextProps.userId);
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
  render() {
    return (
      <Tabs className="row sub-component">
        <TabList>
          <Tab>Items</Tab>
        </TabList>
        <TabPanel>
          <div>
            {this.state.userItems && this.state.userItems.map(item =>
              (<PublicUserItemEntry
                image={item.image}
                title={item.title}
                description={item.itemDescription}
                borrowed={item.borrower_id ? true : false}
                populateProfile={this.props.populateProfile}
                fetchUserItems={this.fetchUserItems.bind(this)}
              />),
            )}
          </div>
        </TabPanel>
      </Tabs>
    );
  }
}

module.exports = PublicProfileItemList;
