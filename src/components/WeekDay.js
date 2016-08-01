import React, { Component } from 'react';
import toCelsius from './../useful/ToCelsius'

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class WeekDay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isToogle : false
    }
    this.toogle = this.toogle.bind(this);
  }

  toogle() {
    let {isToogle} = this.state;
    isToogle = !isToogle;
    this.setState({isToogle : isToogle});
  }

  render() {
    let {day, weather, daysWidth} = this.props;
    let {isToogle} = this.state;
    let d = new Date(day);

    let maxTemp = -275, minTemp = 400;

    weather.forEach(o => {
      if(o.main.temp > maxTemp)
        maxTemp = o.main.temp;
      if(o.main.temp < minTemp)
        minTemp = o.main.temp;
    });

    return (
      <div
        style={{
          minWidth : daysWidth
        }}
        className="week-day"
        onClick={() => this.toogle()}>
        <div>
          { daysOfWeek[d.getDay()]}
          <div className="max header">Max {toCelsius(maxTemp)}</div>
          <div className="min header">Min {toCelsius(minTemp)}</div>
        </div>
        {weather.map((o, idx) => {
          return (isToogle &&
            <div key={idx}>
              <div className="day-hour"> {o.hour.replace(':00', 'h')} - {toCelsius(o.main.temp)}  </div>
            </div>);
        })}
      </div>
    );
  }
}
