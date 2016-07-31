import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather';

export default class Board extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {weekWeather} = this.props;
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
