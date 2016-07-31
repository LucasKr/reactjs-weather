import React, { Component } from 'react';


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

    let weekWeather = [];
    days.forEach(day => {
      let weatherObjs = [];
      nextDays.forEach( o => {
        if(day === o.dt_txt.substring(0, 10) ) {
          let hour = o.dt_txt.substr(11, 5);
          let {main} = o;
          let weatherObj = {
            hour : hour,
            main : main
          }
          weatherObjs.push(weatherObj);
        }
      });
      weekWeather.push(weatherObjs);
    });

    weekWeather.forEach(o => console.log(o));
  }

  render() {
    let {nextDays} = this.props;
    this.listDays(nextDays);
    return (
      <div> 
      </div>
    );
  }
}
