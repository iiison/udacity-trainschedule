import React from 'react';
import styles from './start.css';
import { stations, cmd } from 'constants.js';

class Start extends React.Component {
  getStations = () => {
    const newStations = [];
    for (const key in stations) newStations.push(
      <option key={key} value={stations[key]}>{stations[key]}</option>
    );

    return newStations;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.currentTarget['depart-station'].value);
    console.log(e.currentTarget['arrive-station'].value);
    console.log(e.currentTarget['time'].value);

    //http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=ASHB&dest=CIVC&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1
    //http://api.bart.gov/docs/sched/index.aspx
  }
  render() {
    return (
      <div className='main'>
        <style scoped type='text/css'>{styles}</style>
        <h2>Lets get started!</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='depart-station'> Depart
            <input id='depart-station' list='stations' />
          </label>
          <label htmlFor='arrive-station'> arrive
            <input id='arrive-station' list='stations' />
          </label>
          <label htmlFor='time'> Time
            <input id='time' type='datetime-local' />
          </label>
          <datalist id='stations'><select>{this.getStations()}</select></datalist>
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default Start;
