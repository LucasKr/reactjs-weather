import React, { Component } from 'react';
import Board from './components/Board';


const INITIAL_CITY = 'blumenau';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setStateWeather = this.setStateWeather.bind(this);
    this.getWeatherInfoFromAPI = this.getWeatherInfoFromAPI.bind(this);
    this.getWeatherInfoFromAPI(INITIAL_CITY);
  }

  getWeatherInfoFromAPI(cityName) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=jaragua%20do%20sul,uk&appid=197c6f0b4ad4e1e3e234551e5d6fd641')
    .then(res => {
      res.json()
      .then(data => this.setStateWeather(data))
      .catch( err => console.log(err));
    })
    .catch( err => console.log(err));
  }

  setStateWeather(data) {
    this.setState({
      weatherInfo : data
    });
  }

  render() {
    return (
      <div>
          <label htmlFor="search-input"> Pesquise pela cidade </label>
          <input id="search-input" type="text" className="search" placeholder="Pesquisar cidade..."/>
          <Board  />
      </div>
    );
  }
}
