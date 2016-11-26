import React from 'react';
import styles from './showhistory.css';
import url from 'url';

export const getHistory = (data = {}, dispatch) => {
  const history = [];

  if (data.schedules)
    history.push(
      <div className='history-list' key='schedules'>
        <h3>Schedules</h3>
        {
          appFuncs
            .uniqueArray(data.schedules)
            .map((thisUrl, idx) => {
              const queryString = url.parse(thisUrl, true).query;

              return (
                <section key={`schedules${idx}`}>
                  From: {queryString.orig} <br />
                  To: {queryString.dest} <br />
                  Date: {queryString.date} <br />
                  {queryString.time && `Time: ${queryString.time}`}
                  <div><button onClick={() => dispatch.urlCache('schedules', thisUrl)}>Get Info</button></div>
                </section>
              );
            })
        }
      </div>
    );

  return history;
};

export const ShowHistory = ({ data, dispatch }) => { // eslint-disable-line no-unused-vars
  const history = getHistory(data, dispatch);


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
