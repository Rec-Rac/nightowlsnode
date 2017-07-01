import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const React = require('react');
const Bar = require('./bar.jsx');
const Mixed = require('./mixed.jsx');
const Doughnut = require('./doughnut.jsx');
const Polar = require('./polar.jsx');
const Radar = require('./radar.jsx');

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
    };
  }
  componentWillMount() {
    this.populateData(this.props.id);
  }
  populateData(profileRoute) {
    fetch(`/api/userTransactions/${profileRoute}`, { credentials: 'same-origin' })
      .then(data => data.json())
      .then(json => {
        this.setState({
        transactions: json,
      })});
  }
  render() {
    return (
      <div>
        <br/>
        <br/>
        <Tabs className="sub-component">
          <TabList>
            <Tab>Accounting by Item</Tab>
            <Tab>Accounting by Date</Tab>
            <Tab>Neighbor Usage Rate</Tab>
          </TabList>
          <TabPanel>
            <div className='row' style={{"min-height":100}}>
              <center><h2>Accounting by Item</h2></center>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                {this.state.transactions && 
                  (<Bar spendingData={this.state.transactions.reduce((acc, curr) => {
                    if (curr.owner_id !== curr.borrower_id) {
                      if (acc.hasOwnProperty(curr.item.title)){
                        if (this.props.id === curr.owner_id){
                          acc[curr.item.title] = acc[curr.item.title] + curr.item.price;
                        } else {
                          acc[curr.item.title] = acc[curr.item.title] - curr.item.price;
                        }
                      } else {
                        if (this.props.id === curr.owner_id){
                          acc[curr.item.title] = curr.item.price;
                        } else {
                          acc[curr.item.title] = 0 - curr.item.price;
                        }
                      }
                    } else {
                      if (acc.hasOwnProperty(curr.item.title)){
                        acc[curr.item.title] = acc[curr.item.title];
                      } else {
                        acc[curr.item.title] = 0;
                      }
                    }
                    return acc;
                  }, {})}></Bar>)
                }
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='row' style={{"min-height":100}}>
              <center><h2>Accounting by Date</h2></center>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                {this.state.transactions && 
                  (<Mixed spendingData={this.state.transactions.sort((a,b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  }).reduce((acc, curr) => {
                    if (curr.owner_id !== curr.borrower_id) {
                      let date = (new Date(curr.createdAt)).toLocaleString().split(',')[0];
                      if (acc.hasOwnProperty(date)) {
                        if (this.props.id === curr.owner_id){
                          acc[date] = acc[date] + curr.item.price;
                        } else {
                          acc[date] = acc[date] - curr.item.price;
                        }
                      } else {
                        if (this.props.id === curr.owner_id){
                          acc[date] = curr.item.price;
                        } else {
                          acc[date] = 0 - curr.item.price; 
                        }
                      }
                    }
                    return acc;
                  }, {})}></Mixed>)
                }
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='row' style={{"min-height":100}}>
              <center><h2>Neighbor Usage Rate</h2></center>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                {this.state.transactions && 
                  (<Polar spendingData={this.state.transactions.reduce((acc, curr) => {
                    if (curr.owner_id !== curr.borrower_id) {
                      if (this.props.id === curr.owner_id){
                        if (acc.hasOwnProperty(curr.borrower.fullName)) {
                          acc[curr.borrower.fullName] = acc[curr.borrower.fullName] + curr.item.price;
                        } else {
                          acc[curr.borrower.fullName] = curr.item.price;
                        }
                      } else {
                        if (acc.hasOwnProperty(curr.owner.fullName)) {
                          acc[curr.owner.fullName] = acc[curr.owner.fullName] - curr.item.price;
                        } else {
                          acc[curr.owner.fullName] = 0 - curr.item.price;
                        }
                      }
                    }
                    return acc;
                  }, {})}></Polar>)
                }
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                {this.state.transactions && 
                  (<Doughnut spendingData={this.state.transactions.reduce((acc, curr) => {
                    if (curr.owner_id !== curr.borrower_id) {
                      if (this.props.id === curr.owner_id){
                        if (acc.hasOwnProperty(curr.borrower.fullName)) {
                          acc[curr.borrower.fullName] = acc[curr.borrower.fullName] + 1;
                        } else {
                          acc[curr.borrower.fullName] = 1;
                        }
                      } else {
                        if (acc.hasOwnProperty(curr.owner.fullName)) {
                          acc[curr.owner.fullName] = acc[curr.owner.fullName] + 1;
                        } else {
                          acc[curr.owner.fullName] = 1;
                        }
                      }
                    }
                    return acc;
                  }, {})}></Doughnut>)
                }
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                {this.state.transactions && 
                  (<Radar spendingData={this.state.transactions.reduce((acc, curr) => {
                    if (curr.owner_id !== curr.borrower_id) {
                      if (this.props.id === curr.owner_id){
                        if (acc.hasOwnProperty(curr.borrower.fullName)) {
                          acc[curr.borrower.fullName] = acc[curr.borrower.fullName] + curr.item.price;
                        } else {
                          acc[curr.borrower.fullName] = curr.item.price;
                        }
                      } else {
                        if (acc.hasOwnProperty(curr.owner.fullName)) {
                          acc[curr.owner.fullName] = acc[curr.owner.fullName] + curr.item.price;
                        } else {
                          acc[curr.owner.fullName] = curr.item.price;
                        }
                      }
                    }
                    return acc;
                  }, {})}></Radar>)
                }
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

module.exports = Data;