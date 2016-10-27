import React from 'react';
import styles from './start.css';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import { bindActionCreators } from 'redux';

class Start extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.object.isRequired,
    schedules: React.PropTypes.object.isRequired,
    stations: React.PropTypes.object.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const
      options = e.currentTarget['stations-select'].options,
      depart = e.currentTarget['depart-station'].value,
      arrive = e.currentTarget['arrive-station'].value;

    const to = Array.from(options).filter((opt) => opt.value === arrive)[0].dataset.abbr;
    const from = Array.from(options).filter((opt) => opt.value === depart)[0].dataset.abbr;
    console.log('from', from, 'to', to);

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

    return <div>{JSON.stringify(this.props.schedules.data.schedule[0])}</div>;
  }
  render() {
    return (
      <div className='main'>
        <style scoped type='text/css'>{styles}</style>
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
    schedules: state.gotSchedules,
    stations: state.gotStations,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    dispatch: bindActionCreators(actionCreators, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Start);
