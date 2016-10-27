import React from 'react';
import styles from './start.css';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import { bindActionCreators } from 'redux';

class Start extends React.Component {
  static propTypes = {
    appError: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.object.isRequired,
    schedules: React.PropTypes.object.isRequired,
    stations: React.PropTypes.object.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const
      arrive = e.currentTarget['arrive-station'].value,
      depart = e.currentTarget['depart-station'].value,
      options = e.currentTarget['stations-select'].options;

    let from, to;

    try {
      to = Array.from(options).filter((opt) => opt.value === arrive)[0].dataset.abbr;
      from = Array.from(options).filter((opt) => opt.value === depart)[0].dataset.abbr;
    } catch (err) {
      return this.props.dispatch.appError('You have selected incorrect stations');
    }

    return from && to ? this.props.dispatch.getSchedules(from, to) : undefined;
  }

  getStations = (e) => {
    if (e){
      e.preventDefault();
      e.stopPropagation();

      return this.props.dispatch.getStations();
    }

    let stations;
    try {
      stations = this.props.stations.data.stations[0].station.map((station, idx) =>
        <option
          data-abbr={station.abbr}
          key={`${station.name}${idx}`}
        >
          {station.name}
        </option>
      );
    }catch (err) {
      stations = 'Please click the button above to get stations';
    }

    return stations;
  }

  makeScheduleForm = () =>
    <form onSubmit={this.handleSubmit}>
      <p>
        <label htmlFor='depart-station'>I want to leave&nbsp;
          <input
            id='depart-station'
            list='stations'
            required
            style={{border: '2px solid black'}}
          />
        </label>
      </p>
      <p>
        <label htmlFor='depart-time'>around
          <input id='depart-time' type='datetime-local' />
        </label>
      </p>
      <p>
        <label htmlFor='arrive-station'>and arrive at&nbsp;
          <input id='arrive-station' list='stations' required style={{border: '2px solid black'}} />
        </label>
      </p>
      <label htmlFor='arrive-time'> by
        <input id='arrive-time' type='datetime-local' />
      </label>
      <datalist id='stations'>
        <select id='stations-select'>{this.getStations()}</select>
      </datalist>
      <input style={{border: '2px solid black'}} type='submit' value='Submit' />
    </form>;

  renderSchedules(){
    if (this.props.schedules.status !=='SUCCESS') return '';

    let
      arriveAt,
      fare,
      leaveAt,
      trips;

    try {
      //date = this.props.schedules.data.schedule[0].data,
      //time = this.props.schedules.data.schedule[0].time,
      trips = this.props.schedules.data.schedule[0].request[0].trip[0].$;
      leaveAt = trips.origTimeMin;
      arriveAt = trips.destTimeMin;
      fare = trips.fare;
    } catch (e) {
      trips = leaveAt = arriveby = fare = 'sorry! something went wrong';
    }

    return <div style={{
      marginBottom: '10px',
      wordWrap:'break-word',
    }}>
      Your train leaves at {leaveAt} and will arrive at {arriveAt} and cost ${fare}
    </div>;
  }

  renderErrors() {
    console.log('errors are', this.props.appError);

    return this.props.appError.msg ?
      <h1>{this.props.appError.msg}</h1> :
      '';
  }
  render() {
    return (
      <div className='main'>
        <style scoped type='text/css'>{styles}</style>
        {this.renderErrors()}
        <h2>Lets get started!</h2>
        {this.renderSchedules()}
        <form onSubmit={this.getStations}>
          <input style={{border: '2px solid black'}} type='submit' value='Update Stations' />
        </form>
        {
          this.props.stations.status === 'SUCCESS' ?
            this.makeScheduleForm():
            'Please get current list of stations'
        }
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  ({
    appError: state.appError,
    schedules: state.gotSchedules,
    stations: state.gotStations,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    dispatch: bindActionCreators(actionCreators, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Start);
