import React, { Component } from 'react';
import toCelsius from './../useful/ToCelsius'

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
    let {day, weather} = this.props;
    let {isToogle} = this.state;
    return (
      <div className="weather-board week-days" onClick={() => this.toogle()}>
        <div>  {day}  </div>
        {weather.map((o, idx) => {
          console.log(o);
          return (isToogle &&
            <div key={idx}>
              <div> {o.hour} - {toCelsius(o.main.temp)}  </div> 
            </div>);
        })}
      </div>
    );
  }
}
