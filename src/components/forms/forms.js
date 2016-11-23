import React from 'react';
import InputMoment from 'st-input-moment';
import inputMomentStyles from './inputmoment.css';

export const makeScheduleForm = ({
  dateFormat,
  getMoreInfo,
  getStation,
  getStations,
  handleClockChange,
  handleClockSave,
  handleClockShowDate,
  handleClockShowTime,
  handleSubmit,
  Popup,
  thisMoment,
  timeFormat,
}) =>
  <form id='schedule-form' onSubmit={handleSubmit}>
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
      <label htmlFor='depart-station'>
        <span>Depart</span>
        <input
          id='depart-station'
          list='stations'
          onChange={getStation}
          required
        />
        <button className='more-info sike' onClick={getMoreInfo} />
      </label>
      <label htmlFor='arrive-station'>
        <span>Arrive</span>
        <input
          id='arrive-station'
          list='stations'
          onChange={getStation}
          required
        />
        <button className='more-info sike' onClick={getMoreInfo} />
      </label>
      <label htmlFor='date'>
        <span>Date</span>
        <input
          id='date'
          onClick={handleClockShowDate}
          readOnly
          required
          type='date'
          value={dateFormat()}
        />
      </label>
      <label htmlFor='time'>
        <span>Time</span>
        <input
          id='time'
          onClick={handleClockShowTime}
          readOnly
          required
          type='time'
          value={timeFormat()}
        />
      </label>
    </p>
    <section id ='inputmoment'>
      <style scoped type='text/css'>{inputMomentStyles}</style>
      <InputMoment
        moment={thisMoment}
        onChange={handleClockChange}
        onSave={handleClockSave}
      />
    </section>
    <datalist id='stations'>
      <select id='stations-select' >{getStations()}</select>
    </datalist>
    <input type='submit' value='Submit' />
  </form>;

makeScheduleForm.propTypes = {
  dateFormat: React.PropTypes.function,
  getMoreInfo: React.PropTypes.function,
  getStation: React.PropTypes.function,
  getStations: React.PropTypes.function,
  handleClockChange: React.PropTypes.function,
  handleClockSave: React.PropTypes.function,
  handleClockShowDate: React.PropTypes.function,
  handleClockShowTime: React.PropTypes.function,
  handleSubmit: React.PropTypes.function,
  Popup: React.PropTypes.node,
  thisMoment: React.PropTypes.function,
  timeFormat: React.PropTypes.function,
};

export const makeStationForm = ({
  departing,
  getStations,
  hasStations,
  switchScheduleConfig,
}) =>
  <form id='station-form' onSubmit={getStations}>
    {!hasStations && <span><input
      type='submit'
      value='Update Stations'
    />&nbsp;</span>}
    <button
      id='schedule-config'
      onClick={switchScheduleConfig}
      value={departing ? 'true' : 'false'}
    >Type: {departing ? 'Departing at specific time' : 'Arriving by specific time'}</button>
  </form>;

makeStationForm.propTypes = {
  departing: React.PropTypes.bool,
  getStations: React.PropTypes.function,
  hasStations: React.PropTypes.number,
  switchScheduleConfig: React.PropTypes.function,
};
