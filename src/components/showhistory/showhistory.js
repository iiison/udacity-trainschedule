import React from 'react';

export const getHistory = (data = {}) => {
  const history = [];

  if (data.schedules)
    history.push(
      <div key='schedules'>
        <h3>Schedules</h3>
        {appFuncs.uniqueArray(data.schedules)}
      </div>
    );

  if (data.stationInfo)
    history.push(
      <div key='Stations'>
        <h3>Stations</h3>
        {appFuncs.uniqueArray(data.stationInfo)}
      </div>
    );

  return history;
};

export const ShowHistory = ({ data, dispatch }) => { // eslint-disable-line no-unused-vars
  const history = getHistory(data);


  return history.length ?
    <section>
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
