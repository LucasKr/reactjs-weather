import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather';

export default class Board extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CurrentWeather />
      </div>
    );
  }
}
