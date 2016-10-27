import React from 'react';
import styles from './start.css';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import { bindActionCreators } from 'redux';

class Start extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.object.isRequired,
    stations: React.PropTypes.object.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const
      options = e.currentTarget['stations-select'].options,
      val = e.currentTarget['depart-station'].value;

    const selected = Array.from(options).filter((opt) => opt.value === val);

    console.log('val', val, 'key', selected[0].dataset.bartkey);
    //http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=ASHB&dest=CIVC&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1
    //http://api.bart.gov/docs/sched/index.aspx
  }

  getStations = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.dispatch.getStations({});
  }

  render() {
    return (
      <div className='main'>
        <style scoped type='text/css'>{styles}</style>
        <h2>Lets get started!</h2>
        <form onSubmit={this.getStations}>
          <input style={{border: '2px solid black'}} type='submit' value='Update Stations' />
        </form>
        <form onSubmit={this.handleSubmit}>
          <p>I want to</p>
          <p>
            <label htmlFor='depart-station'> leave
              <input id='depart-station' list='stations' />
            </label>
          </p>
          <p>
            <label htmlFor='depart-time'>around
              <input id='depart-time' type='datetime-local' />
            </label>
          </p>
          <p>and</p>
          <p>
            <label htmlFor='arrive-station'> arrive at
              <input id='arrive-station' list='stations' />
            </label>
          </p>
          <label htmlFor='arrive-time'> by
            <input id='arrive-time' type='datetime-local' />
          </label>
          <datalist id='stations'><select id='stations-select'>{}</select></datalist>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  ({
    stations: state.stations,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    dispatch: bindActionCreators(actionCreators, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Start);
