import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'reactabular';
import * as actionCreators from 'store/actions/index.js';
import * as consts from 'constants.js';
import * as dom from 'lib/dom.js';
import * as forms from 'components/forms/forms.js';
import * as time from 'lib/time.js';
import Popup from 'react-popup';
import React from 'react';
import Stationinfo from 'components/stationinfo/stationinfo.js';
import styles from './start.css';

class Start extends React.Component {
  static propTypes = {
    appError: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.object.isRequired,
    randomSchedule: React.PropTypes.bool.isRequired,
    schedules: React.PropTypes.object.isRequired,
    stationInfo: React.PropTypes.object,
    stations: React.PropTypes.object.isRequired,
    urls: React.PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props);
    this.state = {
      departing: true,
      m : time.moment(),
    };
  }

  componentDidMount () {
    // get stations

    if (!this.props.randomSchedule)
      this.props.dispatch.getBart({ type: 'stations', url: consts.stationUrl() });
  }

  componentWillReceiveProps (nextProps) {
    // get initial schedule
    if (!this.props.randomSchedule && !nextProps.randomSchedule) return this.getInitialSchedule(nextProps);

    return false;
  }

  /**
   * Gets a schedule on load
   * @method getInitialSchedule
   * @param  {[type]}           nextProps [description]
   * @return {[type]}           [description]
   */
  getInitialSchedule = (nextProps) => {
    try {
      const latestStation = this.props.urls.stations[0];
      const options = nextProps.stations.data[latestStation].stations[0].station.asMutable();

      // get first and second stations
      const
        from = options[0],
        scheduleConfigDepartBool = true,
        to = options[1];

      const
        fromAbbr = from.abbr[0],
        toAbbr = to.abbr[0];

      // get random schedule
      const url = consts.scheduleUrl({
        from: fromAbbr,
        scheduleConfigDepartBool,
        to: toAbbr,
      });

      if (this.props.schedules.data[url]) {
        this.props.dispatch.urlCache('schedules', url);
        this.props.dispatch.gotRandomSchedule(!this.props.randomSchedule);
      } else {
        this.props.dispatch.getBart({ type: 'schedules', url });
        this.props.dispatch.gotRandomSchedule(!this.props.randomSchedule);
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  dateFormat = () =>
    this.state.m.format(time.getDateFormat());

  timeFormat = () =>
    this.state.m.format(time.getTimeFormat());

  /**
   * Handle submission of get schedule form
   * @method handleSubmit
   * @param  {[type]}     e [description]
   * @return {[type]}     [description]
   */
  handleSubmit = (e) => {
    if (!e) return false;
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();

    const
      scheduleConfigDepartBool = this.state.departing,
      thisTarget = e.currentTarget || e;

    const
      arrive = thisTarget['arrive-station'].value,
      dateTime = time.getBartTime(
        `${this.state.m.format(time.getTodaysDate())}T${this.state.m.format(time.getRightNowTime())}`
      ),
      depart = thisTarget['depart-station'].value,
      options = thisTarget['stations-select'].options;

    let
      from,
      fromAbbr,
      to,
      toAbbr;

    try {
      to = Array.from(options).find((opt) => opt.value === arrive);
      from = Array.from(options).find((opt) => opt.value === depart);

      fromAbbr = from.dataset.abbr;
      toAbbr = to.dataset.abbr;
    } catch (err) {
      return this.props.dispatch.appError('The selected stations do not exist');
    }

    const
      thisDate = dateTime.substring(0, dateTime.indexOf(' ')).trim(),
      thisTime = dateTime.substring(dateTime.indexOf(' ')).trim();

    const url = consts.scheduleUrl({
      date: thisDate,
      from: fromAbbr,
      scheduleConfigDepartBool,
      time: thisTime,
      to: toAbbr,
    });

    if (this.props.schedules.data[url])
      return this.props.dispatch.urlCache('schedules', url);

    return from && to ?
      this.props.dispatch.getBart({
        type: 'schedules',
        url,
      }) :
      null;
  }

  /**
   * handle submission of get stations form
   * @method getStations
   * @param  {[type]}    e [description]
   * @return {[type]}    [description]
   */
  getStations = (e) => {
    const latestStation = this.props.urls.stations[0];
    if (e) {
      e.preventDefault();
      e.stopPropagation();

      return latestStation === consts.stationUrl() ?
        false :
        this.props.dispatch.getBart({ type: 'stations', url: consts.stationUrl() });
    }

    let stations;
    try {
      stations = this.props.stations.data[latestStation].stations[0].station.map((station, idx) =>
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
    } catch (err) {
      stations = 'Please click the button above to get stations';
    }

    return stations;
  }

  /**
   * get a specific station
   * @method getStation
   * @param  {[type]}   e [description]
   * @return {[type]}   [description]
   */
  getStation = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let abbr, url;
    try {
      const latestStation = this.props.urls.stations[0];
      abbr = `${this.props.stations.data[latestStation].stations[0].station.find((station) =>
        station.name[0] === e.currentTarget.value
      ).abbr[0] }`;

      url = consts.stationInfoUrl({ from: abbr });
    } catch (err) {
      abbr = abbr || '';
    } finally {
      if (url && this.props.stationInfo.data && this.props.stationInfo.data[url])
        this.props.dispatch.urlCache('stationInfo', url);
      else if (url)
        this.props.dispatch.getBart({ type: 'stationInfo', url });

      return dom.setNextInnerHtml(e.currentTarget, abbr);
    }
  }

  /**
   * Get more info about a station
   * @method getMoreInfo
   * @param  {[type]}    e [description]
   * @return {[type]}    [description]
   */
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
      const latestStation = this.props.urls.stations[0];
      thisEl = this.props.stations.data[latestStation].stations[0].station.find((station) =>
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

    if (abbr) {
      const url = consts.stationInfoUrl({ from: abbr });
      let stationExtraInfo;
      try {
        stationExtraInfo = this.props.stationInfo.data[url];
      } catch (err) {
        stationExtraInfo = {};
      }
      if (!stationExtraInfo.uri)
        this.props.dispatch.getBart({ type: 'stationInfo', url });

      return Popup.create({
        buttons: {
          // left: ['cancel'],
          right: [{
            action: (popup) => popup.close(),
            text: 'Ok',
            // className: 'special-btn', // optional
          }]
        },
        className: 'alert',
        content: <Stationinfo {...stationinfo} stationExtraInfo={stationExtraInfo} /> || 'No information found',
        title: stationinfo.name ? `${stationinfo.name} Station Information` : 'Bart Station Information',
      });
    }

    return false;
  }

  /**
   * flip schedule config type and possibly update schedule if both input controls have valid stations
   * @method switchScheduleConfig
   * @param  {[type]}             e [description]
   * @return {[type]}             [description]
   */
  switchScheduleConfig = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ departing: !this.state.departing });
  }


  /**
   * returns renderable list
   * @method getSavedSchedules
   * @param {Array} allSchedules this.props.schedules.data.schedule[0].request[0].trip
   * @return {HTMLElement|null}          [description]
   */
  getSavedSchedules = (allSchedules) => {
    if (!Array.isArray(allSchedules) || !allSchedules.length) return null;

    try {
      const tableData = allSchedules.map((trip, idx) => ({
        arriveAt: `${trip.$.destTimeMin} ${trip.$.destTimeDate}`,
        id: idx,
        leaveAt: `${trip.$.origTimeMin} ${trip.$.origTimeDate}`,
      }));

      const tableColumns = [
        { header: { label: 'Arrival' }, property: 'arriveAt' },
        { header: { label: 'Departure' }, property: 'leaveAt' },
      ];

      return [
        <section
          className='fare'
          key='01'
        >
          <sup>$</sup>{allSchedules[0].$.fare}
        </section>,
        <Table.Provider
          className='striped'
          columns={tableColumns}
          key='02'
        >
          <Table.Header />
          <Table.Body
            rowKey='id'
            rows={tableData}
          />
        </Table.Provider>
      ];
    } catch (err) {
      return null;
    }
  }

  renderSchedules = ({
    errMsg,
    schedule,
    stations,
    status
  }) => {
    if (status !== 'SUCCESS' || errMsg) return null;

    const formattedSchedules = this.getSavedSchedules(schedule);

    return formattedSchedules ?
      <div className='schedules'>
        <section style={{ textAlign: 'center' }}>
          {stations.origin && <div>From: {stations.origin}</div>}
          {stations.destination && <div>To: {stations.destination}</div>}
        </section>
        {formattedSchedules}
      </div> :
      null;
  }

  renderErrors = (e) => e ? <h1>{e}</h1> : null;

  handleClockChange = (m) =>
    this.setState({ m: m });

  handleClockSave = () =>
    document.getElementsByClassName("m-input-moment")[0].style.display = 'none';

  handleClockShowDate = () =>
    document.getElementsByClassName("m-input-moment")[0].style.display = 'block';

  handleClockShowTime = () =>
    document.getElementsByClassName("m-input-moment")[0].style.display = 'block';

  render () {
    let
      errMsg = '',
      schedule = [],
      stations = {},
      status = '';
    try {
      errMsg = this.props.appError.msg;
      schedule = this.props.schedules.data[this.props.urls.schedules[0]].schedule[0].request[0].trip;
      stations = {
        destination: this.props.schedules.data[this.props.urls.schedules[0]].destination[0],
        origin: this.props.schedules.data[this.props.urls.schedules[0]].origin[0],
      };
      status = this.props.schedules.status;
    } catch (err) {
      // do nothing
    }

    return (
      <div className='start'>
        <style scoped type='text/css'>{styles}</style>
        {this.renderErrors(errMsg)}
        <section id='start-forms'>
          {forms.makeStationForm({
            departing: this.state.departing,
            getStations: this.getStations,
            hasStations: this.props.urls.stations.length,
            switchScheduleConfig: this.switchScheduleConfig,
          })}
          {
            this.props.stations.status === 'SUCCESS' &&
            forms.makeScheduleForm({
              dateFormat: this.dateFormat,
              getMoreInfo: this.getMoreInfo,
              getStation: this.getStation,
              getStations: this.getStations,
              handleClockChange: this.handleClockChange,
              handleClockSave: this.handleClockSave,
              handleClockShowDate: this.handleClockShowDate,
              handleClockShowTime: this.handleClockShowTime,
              handleSubmit: this.handleSubmit,
              Popup,
              thisMoment: this.state.m,
              timeFormat: this.timeFormat,
            })
          }
        </section>
        <section>
          {this.renderSchedules({
            errMsg,
            schedule,
            stations,
            status
          })}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  ({
    appError: state.appError,
    randomSchedule: state.gotRandomSchedule,
    schedules: state.gotSchedules,
    stationInfo: state.gotStationInfo,
    stations: state.gotStations,
    urls: state.urlCache,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    dispatch: bindActionCreators(actionCreators, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Start);
