import React, {Component} from 'react';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      wx: '',
      humidity: '',
      temp: ''
    }
  };

  componentDidMount() {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=los+angeles&appid=8ef93e169d7faacbc87963441582f7b4`
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      this.setState({location: json.name, wx: json.weather[0].description, humidity: json.main.humidity, temp: json.main.temp})
    }).catch(error => console.error('Error:', error));
  }


  render() {
    let fa = Math.round(this.state.temp * 9/5 -459.67)

    return (
      <section id="weather-bar">
        <div className="location">{this.state.location.toUpperCase()}</div>
        <div className="weather">{this.state.wx.toUpperCase()}</div>
        <div className="humidity">HUMIDITY &nbsp;{this.state.humidity}%</div>
        <div className="temperature">{fa}&deg; F</div>
      </section>
    )
    };
  }


export default Weather;
