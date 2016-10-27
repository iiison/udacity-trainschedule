export function updateMsg(text) {
  return {
    text,
    type: 'UPDATE_MSG'
  };
}

export function getStations({ status = 'PENDING', error = null}) {
  return {
    error,
    status,
    type: 'GET_STATIONS',
  };
}
