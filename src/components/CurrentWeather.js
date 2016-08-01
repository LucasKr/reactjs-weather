import React, { Component } from 'react';
import toCelsius from './../useful/ToCelsius'

export default class CurrentWeather extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {main, cityName} = this.props;
    return (
      <div className="current-weather">
        <div className="header">{cityName} current weather: {toCelsius(main.temp)} </div>
        <div className="max">Max: {toCelsius(main.temp_max)} </div>
        <div className="min">Min: {toCelsius(main.temp_min)} </div>
      </div>
    );
  }
}
