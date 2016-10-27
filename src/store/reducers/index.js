import Immutable from 'seamless-immutable';
import axios from 'axios';

export function msg(state = Immutable({}), action) {
  return action.type === 'UPDATE_MSG' && typeof action.text === 'string' ?
    Immutable({ ...state, msg: action.text }) :
    state;
}

export function getStations(state = Immutable({}), action) {
  if (action.type !== 'GET_STATIONS') return state;
  ((dispatch) => {
    switch (action.status) {
      case 'PENDING': {
        console.log('made it in');

        return axios.get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V')
        .then((response) => {
          console.log('response is', response);

          return Immutable({ ...state, stations: response });
        })
        .catch((error) => {
          console.log(error);

          return dispatch.getStations(error);
        });
      }
      case 'ERROR': {
        break;
      }
      case 'SUCCESS': {
        break;
      }
      default: return state;
    }
  })();
}
