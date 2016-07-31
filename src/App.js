import React, { Component } from 'react';
import NextDaysWeatherContainer from './components/NextDaysWeatherContainer';
import CurrentWeather from './components/CurrentWeather';
import toCelsius from './useful/ToCelsius';

const INITIAL_CITY = 'blumenau';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherInfo : {
        current : {
          main : {}
        },
        nextDays : []
      }
    };

    this.setStateCurrentWeather = this.setStateCurrentWeather.bind(this);
    this.setStateWeekWeather = this.setStateWeekWeather.bind(this);
    this.getWeatherInfoFromAPI = this.getWeatherInfoFromAPI.bind(this);

    this.getWeatherInfoFromAPI(INITIAL_CITY);
  }

  getWeatherInfoFromAPI(cityName) {
    //Ler temperatura atual.
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=197c6f0b4ad4e1e3e234551e5d6fd641')
    .then(res => {
      res.json()
      .then(currentData => {
        //Ler temperatura do resto da semana.
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName +',uk&appid=197c6f0b4ad4e1e3e234551e5d6fd641')
        .then(response => {
          response.json()
            .then(weekData => this.setStateWeekWeather(weekData))
            .catch( err => console.log(err));
        })
        .catch( err => console.log(err));
        this.setStateCurrentWeather(currentData);
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err));

  }

  setStateCurrentWeather(data) {
    let {weatherInfo} = this.state;
    weatherInfo.current = data;
    this.setState({
      weatherInfo : weatherInfo
    })
  }

  setStateWeekWeather(data) {
    let {weatherInfo} = this.state;
    let {list} = data;
    weatherInfo.nextDays = list;
    this.setState({
      weatherInfo : weatherInfo
    });
  }

  render() {
    let {main, name} = this.state.weatherInfo.current;
    let {nextDays} = this.state.weatherInfo; 
    return (
      <div>
          <h3> Search for the city </h3>
          <input
            id="search-input"
            className="search"
            type="text"
            placeholder="Fill with the city name here..."
            onChange={ (event) => {
                let city = event.target.value;
                this.getWeatherInfoFromAPI(city);
              }
            }/>
          <h4>Current Temperature {toCelsius(main.temp)} - {name} </h4>
          <CurrentWeather main={main}/>
          <NextDaysWeatherContainer nextDays={nextDays} />
      </div>
    );
  }

}
