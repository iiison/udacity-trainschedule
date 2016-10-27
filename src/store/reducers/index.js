import Immutable from 'seamless-immutable';

export function msg(state = Immutable({}), action) {
  return action.type === 'UPDATE_MSG' && typeof action.text === 'string' ?
    Immutable({ ...state, msg: action.text }) :
    state;
}

export function appError(state = Immutable({}), action) {
  console.log('action is', action);

  return action.type === 'APP_ERROR' ?
    Immutable({ ...state, msg: action.text }) :
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

export function gotSchedules(state = Immutable({}), action) {
  if (action.type !== 'GOT_SCHEDULES') return state;

  return Immutable({
    ...state,
    data: action.data,
    status: action.status || 'oops'
  });
}
