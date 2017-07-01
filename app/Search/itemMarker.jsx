import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const itemMarker = ({item, handleClick }) => (
  <Marker position={item.owner.location} >
    <Popup >
      <div>
        <h3>{item.title}</h3>
        <a href={`/items/${item.title}`} onClick={(evt) => {evt.preventDefault(); alert(item.title);}}><img className="img-thumbnail" src={item.image} alt={item.title} /></a>
      </div> 
    </Popup>
  </Marker>
);

module.exports = itemMarker;
