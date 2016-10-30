import React from 'react';
import styles from './start.css';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import { bindActionCreators } from 'redux';
import * as dom from 'lib/dom.js';
import Popup from 'react-popup';
import Stationinfo from 'components/stationinfo/stationinfo.js';
import * as time from 'lib/time.js';
import { Table } from 'reactabular';

class Start extends React.Component {
  static propTypes = {
    appError: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.object.isRequired,
    scheduleConfig: React.PropTypes.object.isRequired,
    schedules: React.PropTypes.object.isRequired,
    stations: React.PropTypes.object.isRequired,
  }

  handleSubmit = (e, setTime) => {
    if (!e) return false;
    if(e.preventDefault) e.preventDefault();
    if(e.stopPropagation) e.stopPropagation();

    const
      scheduleConfigDepartBool = this.props.scheduleConfig.depart,
      thisTarget = e.currentTarget || e;

    const
      arrive = thisTarget['arrive-station'].value,
      dateTime = time.getBartTime(
        setTime ||
        thisTarget[scheduleConfigDepartBool ? 'depart-time' : 'arrive-time'].value
      ),
      depart = thisTarget['depart-station'].value,
      options = thisTarget['stations-select'].options;

    let from, to;

    try {
      to = Array.from(options).find((opt) => opt.value === arrive).dataset.abbr;
      from = Array.from(options).find((opt) => opt.value === depart).dataset.abbr;
    } catch (err) {
      return this.props.dispatch.appError('The selected stations do not exist');
    }

    const
      thisDate = dateTime.substring(0, dateTime.indexOf(' ')).trim(),
      thisTime = dateTime.substring(dateTime.indexOf(' ')).trim();

    return from && to ? this.props.dispatch.getBart({
      from,
      scheduleConfigDepartBool,
      thisDate,
      thisTime,
      to,
      type: 'schedules',
    }) : undefined;
  }

  getStations = (e) => {
    if (e){
      e.preventDefault();
      e.stopPropagation();

      return this.props.dispatch.getBart({type: 'stations'});
    }

    let stations;
    try {
      stations = this.props.stations.data.stations[0].station.map((station, idx) =>
        <option
          data-abbr={station.abbr}
          data-address={station.address}
          data-city={station.city}
          data-county={station.county}
          data-name={station.name}
          data-state={station.state}
          data-zipcode={station.zipcode}
          key={`${station.abbr}${idx}`}
        >
          {station.name}
        </option>
      );
    }catch (err) {
      stations = 'Please click the button above to get stations';
    }

    return stations;
  }

  getStation = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let abbr;
    try {
      abbr = `${this.props.stations.data.stations[0].station.find((station) =>
        station.name[0] === e.currentTarget.value
      ).abbr[0] }`;
    } catch (err) {
      abbr = '';
    } finally {
      return dom.setNextInnerHtml(e.currentTarget, abbr);
    }
  }

  getMoreInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let thisEl;
    const
      abbr = e.currentTarget.dataset.abbr,
      stationinfo = {
        abbr: undefined,
        address: undefined,
        city: undefined,
        county: undefined,
        name: undefined,
        thisEl: undefined,
        zipcode: undefined,
      };

    try {
      thisEl = this.props.stations.data.stations[0].station.find((station) =>
        station.abbr[0] === abbr
      );
      if (thisEl) {
        stationinfo.name = thisEl.name[0];
        stationinfo.abbr = thisEl.abbr[0];
        stationinfo.city = thisEl.city[0];
        stationinfo.county = thisEl.county[0];
        stationinfo.zipcode = thisEl.zipcode[0];
        stationinfo.address = thisEl.address[0];
      }
    } catch (err) {
      // do nothing
    }

    return abbr &&
      // Popup.alert(e.currentTarget.innerHTML);
      Popup.create({
        buttons: {
          // left: ['cancel'],
          right: [{
            action: (popup) => popup.close(),
            text: 'Ok',
            // className: 'special-btn', // optional
          }]
        },
        className: 'alert',
        content: <Stationinfo {...stationinfo} /> || 'No information found',
        title: stationinfo.name && `${stationinfo.name} Station Information` || 'Bart Station Information',
      });
  }

  getScheduleConfig = (type) => this.props.scheduleConfig[type];

  switchScheduleConfig = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let thisTime;
    try {
      thisTime = document.getElementById('arrive-time').value;
    } catch (err) {
      try {
        thisTime = document.getElementById('depart-time').value;
      } catch (err2) {
        // do nothing
      }
    }

    this.props.dispatch.scheduleConfigDepart();

    return document.getElementsByClassName('more-info sike').length === 0 ?
      this.handleSubmit(document.getElementById('schedule-form'), thisTime) : false;
  }

  makeScheduleForm = () =>
    <form id='schedule-form' onSubmit={this.handleSubmit}>
      <Popup
        btnClass='mm-popup__btn'
        className='mm-popup'
        closeBtn={false}
        closeHtml={null}
        defaultCancel='Cancel'
        defaultOk='Ok'
        wildClasses={false}
      />
      <p>
        <label htmlFor='depart-station'><span>I want to leave </span>
          <input
            id='depart-station'
            list='stations'
            onChange={this.getStation}
            required

          />&nbsp;
          <button className='more-info sike' onClick={this.getMoreInfo} />
        </label>
      </p>
      {this.getScheduleConfig('depart') &&
        <p>
          <label htmlFor='depart-time'><span>around </span>
            <input id='depart-time' type='datetime-local' />
          </label>
        </p>
      }
      <p>
        <label htmlFor='arrive-station'><span>and arrive at </span>
          <input
            id='arrive-station'
            list='stations'
            onChange={this.getStation}
            required

          />&nbsp;
          <button className='more-info sike' onClick={this.getMoreInfo} />
        </label>
      </p>
      {!this.getScheduleConfig('depart') &&
        <p>
          <label htmlFor='arrive-time'><span>by </span>
            <input id='arrive-time' type='datetime-local' />
          </label>
        </p>
      }
      <datalist id='stations'>
        <select id='stations-select' >{this.getStations()}</select>
      </datalist>
      <input type='submit' value='Submit' />
    </form>;

  /**
   * returns renderable list
   * @method getSavedSchedules
   * @return {HTMLElement|null}          [description]
   */
  getSavedSchedules = () => {
    if (this.props.appError.msg) return [];

    let
      allSchedules,
      tableColumns,
      tableData;

    try {
      allSchedules = this.props.schedules.data.schedule[0].request[0].trip;
      if (!allSchedules.length) return [];

      tableData = allSchedules.map((trip, idx) => ({
        arriveAt: `${trip.$.destTimeMin} ${trip.$.destTimeDate}`,
        fare: trip.$.fare,
        id: idx,
        leaveAt: `${trip.$.origTimeMin} ${trip.$.origTimeDate}`,
      }));
      tableColumns = [
        {
          header: {
            label: 'Fare'
          },
          property: 'fare',
        },
        {
          header: {
            label: 'Arrival'
          },
          property: 'arriveAt',
        },
        {
          header: {
            label: 'Departure'
          },
          property: 'leaveAt',
        },
      ];

      return (
        <Table.Provider
          className='pure-table pure-table-striped'
          columns={tableColumns}
        >
          <Table.Header />

          <Table.Body
            rowKey='id'
            rows={tableData}
          />
        </Table.Provider>
      );
    } catch (err) {
      console.log('got err', err);

      return [];
    }
  }

  renderSchedules = () => {
    if (this.props.schedules.status !== 'SUCCESS' || this.props.appError.msg) return '';

    const formattedSchedules = this.getSavedSchedules();

    if (Array.isArray(formattedSchedules) && !formattedSchedules.length) return null;

    return (
      <div className='schedules'>
        {formattedSchedules}
      </div>
    );
  }

  renderErrors() {
    const error = this.props.appError.msg;

    return error ? <h1>{this.props.appError.msg}</h1> : '';
  }

  render() {
    return (
      <div className='start'>
        <style scoped type='text/css'>{styles}</style>
        {this.renderErrors()}
        {this.renderSchedules()}
        <section id='start-forms'>
          <form id='station-form' onSubmit={this.getStations}>
            <input

              type='submit'
              value='Get Stations'
            />&nbsp;
            <button
              onClick={this.switchScheduleConfig}

            >Type: {this.props.scheduleConfig.depart ? 'Departing' : 'Arriving'}</button>
          </form>
          {
            this.props.stations.status === 'SUCCESS' &&
            this.makeScheduleForm()
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  ({
    appError: state.appError,
    scheduleConfig: state.scheduleConfig,
    schedules: state.gotSchedules,
    stations: state.gotStations,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    dispatch: bindActionCreators(actionCreators, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Start);
