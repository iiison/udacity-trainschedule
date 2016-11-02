import axios from 'axios';
import { parseString } from 'xml2js';
import consts from 'constants.js';

export function updateMsg(text) {
  return {
    text,
    type: 'UPDATE_MSG'
  };
}

export function appError(data) {
  return {
    data,
    type: 'APP_ERROR',
  };
}

export function gotRandomSchedule(bool) {
  return {
    bool,
    type: 'RANDOM_SCHEDULE',
  };
}

export function scheduleConfigDepart() {
  return {
    type: 'SCHEDULE_CONFIG_DEPART',
  };
}

export function gotSchedules({
  data = {},
  status = 'UNKNOWN',
  type = 'GOT_SCHEDULES',
}) {
  return {
    data,
    status,
    type
  };
}

export function gotStations({
  data = {},
  status = 'UNKNOWN',
  type = 'GOT_STATIONS',
}) {
  return {
    data,
    status,
    type
  };
}

export function gotStationInfo({
  data = {},
  status = 'UNKNOWN',
  type = 'GOT_STATION_INFO',
}) {
  return {
    data,
    status,
    type
  };
}

export function getBart({
  from,
  to,
  thisDate,
  thisTime,
  scheduleConfigDepartBool,
  type
}) {
  let
    cmd,
    date,
    functionName,
    time,
    url;
  switch (type) {
    case 'stationInfo': {
      functionName = gotStationInfo;
      url = `http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${from}&key=${consts.apikey}`;
      break;
    }
    case 'stations': {
      functionName = gotStations;
      url = `http://api.bart.gov/api/stn.aspx?cmd=stns&key=${consts.apikey}`;
      break;
    }
    case 'schedules': {
      cmd = scheduleConfigDepartBool ? 'depart' : 'arrive',
      date = `&date=${thisDate || 'now'}`,
      functionName = gotSchedules;
      time = thisTime ? `&time=${thisTime}` : '';
      url = `http://api.bart.gov/api/sched.aspx?cmd=${cmd}&orig=${from}&dest=${to}${date}${time}&key=${consts.apikey}&b=4&a=4&l=1`;

      console.log('data is', date, time, url);
      break;
    }
    default: return false;
  }

  if(!functionName) return false;

  return (dispatch) => {
    dispatch(functionName({
      data: 'pending',
      status: 'PENDING',
    }));

    dispatch(appError(''));

    return axios.get(url)
    .then((response) => parseString(response.data, (err, result) => {
      try {
        const errorMessage = `${result.root.message[0].error[0].text[0]}
        ${result.root.message[0].error[0].details[0]}`;

        return dispatch(appError(errorMessage));
      } catch (err2) {
        return dispatch(functionName({
          data: result.root || err2,
          status: 'SUCCESS',
        }));
      }
    }))
    .catch((error) => dispatch(appError({
      data: error,
      status: 'ERROR',
    })));
  };
}
