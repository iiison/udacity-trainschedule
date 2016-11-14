import Immutable from 'seamless-immutable';

export function msg(state = Immutable({}), action) {
  return action.type === 'UPDATE_MSG' && typeof action.text === 'string' ?
    Immutable({ ...state, msg: action.text }) :
    state;
}

export function gotRandomSchedule(state = Immutable({}), action) {
  return action.type === 'RANDOM_SCHEDULE' ?
    action.bool :
    state;
}

export function scheduleConfig(state = Immutable({}), action) {
  return action.type === 'SCHEDULE_CONFIG_DEPART' ?
    Immutable({...state, depart: !state.depart}) : state;
}

export function appError(state = Immutable({}), action) {
  return action.type === 'APP_ERROR' ?
    Immutable({ ...state, msg: action.data }) :
    state;
}

export function gotStations(state = Immutable({}), action) {
  if (action.type !== 'GOT_STATIONS') return state;

  return Immutable({
    ...state,
    data: action.data,
    status: action.status || 'oops'
  });
}

export function gotStationInfo(state = Immutable({}), action) {
  if (action.type !== 'GOT_STATION_INFO') return state;

  return Immutable({
    ...state,
    data: action.data,
    status: action.status || 'oops'
  });
}

export function gotSchedules(state = Immutable({}), action) {
  if (action.type !== 'GOT_SCHEDULES') return state;
  let data;
  if (state.data instanceof Map) {
    console.log('setting this data to state.data');
    data = state.data;
  } else {
    console.log('setting this data to new Map()');
    data = new Map();
  }
  data.set(String(action.url), action.data);

  const vanillaJavascriptObject = {
    ...state,
    status: action.status || 'oops'
  };

  vanillaJavascriptObject.data = data;
  const immutableDoesNotWorkWithJavascriptMaps = Immutable(vanillaJavascriptObject);
  console.log(`is map in javascript object?: ${vanillaJavascriptObject.data.has(action.url)}`);
  console.log(`is map in immutable object?: ${immutableDoesNotWorkWithJavascriptMaps.data.has(action.url)}`);
  return Immutable(immutableDoesNotWorkWithJavascriptMaps);
}
