import axios from 'axios';
import { parseString } from 'xml2js';

export function urlCache(url) {
  return {
    type: 'UPDATE_URL_CACHE',
    url,
  };
}

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
  data = new Map(),
  status = 'UNKNOWN',
  type = 'GOT_SCHEDULES',
  url = '',
}) {
  return {
    data,
    status,
    type,
    url,
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
  type,
  url,
}) {
  let functionName;
  switch (type) {
    case 'stationInfo': {
      functionName = gotStationInfo;
      break;
    }
    case 'stations': {
      functionName = gotStations;
      break;
    }
    case 'schedules': {
      functionName = gotSchedules;
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
            url,
          }));
        }
      }))
      .catch((error) => dispatch(appError({
        data: error,
        status: 'ERROR',
      })));
  };
}
