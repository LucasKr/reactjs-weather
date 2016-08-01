import React, { Component } from 'react';
import WeekDay from './WeekDay';
import toCelsius from './../useful/ToCelsius'

export default class NextDaysWeatherContainer extends Component {

  constructor(props) {
    super(props);
    this.listDays = this.listDays.bind(this);
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
    let weekDaysWeather = this.listDays(this.props.nextDays);
    let {average, week} = weekDaysWeather;
    return (
      <div>
        <div> Average of the next 5 days:</div>
        <div> {average.highestTemp.day} will have the <div style={{color : 'red'}}> highest </div> Temperature { toCelsius(average.highestTemp.temp)} at </div>
        <div> {average.lowestTemp.day} will have <div style={{color : 'blue'}}>lowest</div> Temperature is { toCelsius(average.lowestTemp.temp)} </div>
        <div className="week">
          <h5> Next days of Week Weather</h5>
        {
          week.map((o, idx) => {
            return <WeekDay key={idx} weather ={o.weather} day={o.day} />
          })
        }
        </div>
      </div>
    );
  }
}
