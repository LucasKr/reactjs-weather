import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.nextDaysWeather = this.nextDaysWeather.bind(this);
  }

  nextDaysWeather(weekWeather) {
    let weather = [];
    weekWeather.forEach( (o, idx) => {
      let lastIdx = idx == 0 ? idx : idx -1;
      let date = o.dt_txt.substring(0, 10);
      let dateBefore = weekWeather[lastIdx].dt_txt.substring(0, 10);
      /*
      if(dateBefore == date) {
        console.log('Equals =' + date);
      } else {
        console.log('Not Equals =' + date);
      }*/
    });
    return weather;
  }

  render() {
    let weekWeather = [];
    return (
      <div>
          {
            weekWeather.map( (o, idx) => {
              let date = o.dt_txt.substring(0, 10);
              let dateBefore = idx - 1 > 0 ? weekWeather[idx - 1].dt_txt.substring(0, 10) : '';
              if(date !== dateBefore) {
                return (
                  <CurrentWeather
                    key={idx}
                    day={date}
                    main={o.main}
                    weather={o.weather[0]}/>);
              }
            })
          }
      </div>
    );
  }
}
