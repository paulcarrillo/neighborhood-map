/* global google */

import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
      >
        {props.markers &&
          props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {
            const venueInfo = props.venues.find(venue => venue.id === marker.id);
            return (
              <Marker
                key={idx}
                position={{ lat:marker.lat, lng:marker.lng }}
                onClick={() => props.handleMarkerClick(marker)}
                animation={arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
                >
                  {marker.isOpen && venueInfo.bestPhoto && (
                    <InfoWindow>
                      <React.Fragment>
                        <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={"Venue " + venueInfo.name} />
                      <h2>{venueInfo.name}</h2>
                      <p>{venueInfo.location.address}</p>
                      <p>{venueInfo.location.city}</p>
                      <p>{venueInfo.location.country}</p>
                     </React.Fragment>
                    </InfoWindow>
                  )}
              </Marker>
            );
          })}
        </GoogleMap>
      ))
    );



export default class Map extends Component {
  render() {
    return(
      <MyMapComponent
        {...this.props}
        id="map"
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBpAAJDJfPAwjwIBzRxOlVmZNJl7_T9M8Y"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div role="application" id="map" style={{ height: `100vh`, width: `100vw` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
