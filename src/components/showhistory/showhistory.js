import React from 'react';
import styles from './showhistory.css';
export const getHistory = (data = {}) => {
  const history = [];

  if (data.schedules)
    history.push(
      <div className='history-list' key='schedules'>
        <h3>Schedules</h3>
        {appFuncs
          .uniqueArray(data.schedules)
          .map((url, idx) => <div key={`schedules${idx}`}>{url}</div>)}
      </div>
    );

  if (data.stationInfo)
    history.push(
      <div className='history-list' key='stations'>
        <h3>Stations</h3>
        {appFuncs
          .uniqueArray(data.stationInfo)
          .map((url, idx) => <div key={`stations${idx}`}>{url}</div>)}
      </div>
    );

  return history;
};

export const ShowHistory = ({ data, dispatch }) => { // eslint-disable-line no-unused-vars
  const history = getHistory(data);


  return history.length ?
    <section>
      <style scoped type='text/css'>{styles}</style>
      <h2>History</h2>
      {history}
    </section> :
    null;
};

ShowHistory.propTypes = {
  data: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.object.isRequired,
};

export default ShowHistory;
