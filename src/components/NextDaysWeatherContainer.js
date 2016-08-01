import React, { Component } from 'react';
import WeekDay from './WeekDay';
import toCelsius from './../useful/ToCelsius'

export default class NextDaysWeatherContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {weekDaysWeather} = this.props;
    let {average, week} = weekDaysWeather;
    let daysWidth = Math.round(100 / week.length) -1;
    return (
      <div>
        <div className="week-board">
          <div className="week-days">
            {
              week.map((o, idx) => {
                return <WeekDay key={idx} weather={o.weather} day={o.day} daysWidth={daysWidth + '%'}/>
              })
            }
          </div>

        </div>
      </div>
    );
  }
}
