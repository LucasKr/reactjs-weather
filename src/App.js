import React, { Component } from 'react';
import NextDaysWeatherContainer from './components/NextDaysWeatherContainer';
import CurrentWeather from './components/CurrentWeather';
import toCelsius from './useful/ToCelsius';
import daysOfWeek from './useful/DaysOfWeek';

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
    this.listDays = this.listDays.bind(this);

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

  listDays(nextDays) {
    let days = [];
    nextDays.forEach( o => {
      if(days.indexOf(o.dt_txt.substring(0, 10)) < 0)
        days.push(o.dt_txt.substring(0, 10));
    });
    let average = {
      highestTemp : { day : '',  temp : -273.15},
      lowestTemp : { day : '',  temp : 400}
    };

    let weekWeather = {average : {}, week : []};
    days.forEach(day => {
      let weatherObjs = [];
      nextDays.forEach( o => {
        if(day === o.dt_txt.substring(0, 10) ) {
          let hour = o.dt_txt.substr(11, 5);
          let {main} = o;

          if(main.temp_max > average.highestTemp.temp)
            average.highestTemp = { day : day, temp : main.temp_max };
          if(main.temp_min < average.lowestTemp.temp)
            average.lowestTemp = { day : day, temp : main.temp_min };

          weatherObjs.push({
            hour : hour,
            main : main
          });
        }
      });
      weekWeather.week.push({day : day, weather : weatherObjs});
    });
    weekWeather.average = average;
    return weekWeather;
  }

  render() {
    let {main, name} = this.state.weatherInfo.current;
    let {nextDays} = this.state.weatherInfo;
    let weekDaysWeather = this.listDays(nextDays);
    let {average} = weekDaysWeather;

    return (
      <div className="main">
          <label htmlFor="search-input"> City: </label>
          <input
            id="search-input"
            className="search"
            type="text"
            placeholder="Type the city name here..."
            onChange={
              (event) => {
                let city = event.target.value;
                this.getWeatherInfoFromAPI(city);
              }
            }/>

          <CurrentWeather
            main={main}
            cityName={name}/>

          <NextDaysWeatherContainer
            weekDaysWeather={weekDaysWeather} />

          <div className="week-average">
            <div> Average of the week:</div>
            <div> {daysOfWeek[new Date(average.highestTemp.day).getDay()] } will have the  highest  Temperature { toCelsius(average.highestTemp.temp)} </div>
            <div> {daysOfWeek[new Date(average.lowestTemp.day).getDay()] } will have lowest  Temperature is { toCelsius(average.lowestTemp.temp)} </div>
          </div>

      </div>
    );
  }

}
