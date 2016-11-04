import Moment from 'moment';

/**
 * formats and returns time in format required by bart API
 * @method getBartTime
 * @param  {[type]}    time [description]
 * @return {[type]}    [description]
 */
export const getBartTime = (time) =>
  time && Moment(time.trim()).format('MM/DD/YYYY h:mm+a').trim();

export const getTodaysDate = () => Moment().format("YYYY-MM-DD");

export const getRightNowTime = () => Moment().format("HH:mm");

export const getDateTimeLocalFormat = () => 'YYYY-MM-DDThh:mm';
export const getDateFormat = () => 'YYYY-MM-DD';
export const getTimeFormat = () => 'HH:mm';

export const moment = Moment;
