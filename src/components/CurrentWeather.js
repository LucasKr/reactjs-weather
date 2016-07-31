import React, { Component } from 'react';
import toCelsius from './../useful/ToCelsius'

export default class CurrentWeather extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {main} = this.props;
    return (
      <div className="current-weather-board" >
        <h5> Weather Now: {toCelsius(main.temp)}</h5>
        <div>Max: {toCelsius(main.temp_max)} </div>
        <div>Min: {toCelsius(main.temp_min)} </div>
      </div>
    );
  }
}
