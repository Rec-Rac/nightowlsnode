import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import ItemMarker from './itemMarker.jsx';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.7128,
      long: -74.0059,
      zoom: 12,
      bounds: [[49.3457868, -124.7844079], [24.7433195, -66.9513812]],
    };
  }
  componentWillReceiveProps(newProps) { // update map bounds
    const { searchResults, location } = newProps;
    if (searchResults.length > 0) {
      const boundList = searchResults.map(item => item.owner.location);
      if (location !== null) {
        boundList.push([location.lat, location.lng]);
      }
      this.setState({ bounds: boundList });
    }
  }

  render() {
    const { searchResults } = this.props;
    return (
      <div>
        <Map
          style={{ height: '500px' }}
          zoom={10}
          bounds={this.state.bounds}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiamx1c3RoYXVzIiwiYSI6ImNqNDYybDh4YTBiMzczMmx0dXhyczBlN3YifQ.v4kXx9my0zpHNu2Xzgo0Tg"
            attribution="<attribution>"
          />
          {searchResults.map(item => (<ItemMarker
            key={item.id}
            item={item}
            handleClick={this.handlePopupClick}
          />))}
        </Map>
      </div>
    );
  }
}
module.exports = MapView;
