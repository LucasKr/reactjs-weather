import React, { Component } from 'react';

const INITIAL_CITY = 'blumenau';

export default class CurrentWeather extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {day, main, weather} = this.props;
    console.log(weather);
    return (
      <div className="current-weather-board">
        <div>{day}</div>
        <div>Temperatura Minima: {main.temp_min -273,15} </div>
        <div>Temperatura Máxima: {main.temp_max -273,15} </div>
        <div>{weather.main}</div>
      </div>
    );
  }
}
