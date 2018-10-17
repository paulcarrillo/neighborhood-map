import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './api/';
import SideBar from './component/SideBar';
import Weather from './component/Weather';
import Header from './component/Header';


class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      marker: [],
      center: [],
      zoom: 9,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({markers: Object.assign(this.state.markers, markers) });
  }

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
        this.setState({venues:Object.assign(this.state.venues, newVenue)});
        console.log(newVenue);
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  }

  componentDidMount(){
    SquareAPI.search({
      near: "Los Angeles,CA",
      query: "beach",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat:venue.location.lat,
          lng:venue.location.lng,
          isOpen: false,
          isVisible: true,
          id:venue.id
        };
      });
      this.setState({venues, center, markers});
      console.log(results);
    });
  }

  render() {
    return (
      <div className="app-container">
        <Header />
          <Weather />
          <main role="main" className="map-container">
            <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
            <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
          </main>
      </div>
    );
  }
}

export default App;
