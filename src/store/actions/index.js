import axios from 'axios';
import { parseString } from 'xml2js';
import consts from 'constants.js';

export function updateMsg(text) {
  return {
    text,
    type: 'UPDATE_MSG'
  };
}

export function appError(text) {
  return {
    text,
    type: 'APP_ERROR',
  };;
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

export function getSchedules(depart, arrive) {
  return (dispatch) => {
    dispatch(gotSchedules({
      data: 'pending',
      status: 'PENDING',
    }));

    dispatch(appError(''));
    return axios.get(`http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${depart}&dest=${arrive}&date=now&key=${consts.apikey}&b=0&a=2&l=1`)
    .then((response) => parseString(response.data, (err, result) =>
      dispatch(gotSchedules({
        data: result.root || err,
        status: 'SUCCESS',
      }))
    ))
    .catch((error) => dispatch(gotSchedules({
      data: error,
      status: 'ERROR',
    })));
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

export function getStations() {
  return (dispatch) => {
    dispatch(gotStations({
      data: 'pending',
      status: 'PENDING',
    }));

    return axios.get(`http://api.bart.gov/api/stn.aspx?cmd=stns&key=${consts.apikey}`)
    .then((response) => parseString(response.data, (err, result) =>
      dispatch(gotStations({
        data: result.root || err,
        status: 'SUCCESS',
      }))
    ))
    .catch((error) => dispatch(gotStations({
      data: error,
      status: 'ERROR',
    })));
  };
}
