import * as actionCreators from 'store/actions/index.js';
import axios from 'axios';

export function updateMsg(text) {
  return {
    text,
    type: 'UPDATE_MSG'
  };
}

export function getStations({
  data = {},
  status = 'PENDING',
  }) {
  return (dispatch) => {
    switch (status) {
      case 'PENDING': {
        return axios.get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=Z44S-5LSG-9QVT-DWE9')
        .then((response) => dispatch(actionCreators.getStations({
          data: response,
          status: 'SUCCESS',
        })))
        .catch((error) => {
          console.log('got error', error);

          return dispatch(actionCreators.getStations({
            data: error,
            status: 'ERROR',
          }));
        });
      }
      case 'SUCCESS': {
        console.log('got success', data);

        return Immutable({ ...state, stations: data });
      }
      case 'ERROR': {
        break;
      }
      default: {
        console.log('oops, made it in default');

        return state;
      }
    }
  };
}
