// Container that calls itemEntry.jsx for each search result
const React = require('react');
const ItemEntry = require('./itementry.jsx');

const Results = ({ userId, socket, handleButtonClick, searchResults, handleBorrow }) => (
  <div className="sub-component">
    <div className="row">
      <div className="col-md-offset-3">
        <div className="btn-group">
          <button
            type="button"
            onClick={handleButtonClick}
            className="btn btn-success"
            name="all"
          >
              Show All
          </button>
          <button
            type="button"
            className="btn btn-default"
            name="available"
            onClick={handleButtonClick}
          >Show Available
          </button>
        </div>
      </div>
    </div>
    <div className="row">
      <div>
        {(searchResults.length > 0) && searchResults.map(item => (<div key={item.id} style={{ padding: '0px 10px' }}>
          <section className="spacer" />
          <ItemEntry
            userId={userId}
            handleBorrow={handleBorrow}
            item={item}
            socket={socket}
          />
        </div>))}
      </div>
    </div>
  </div>
);


module.exports = Results;
