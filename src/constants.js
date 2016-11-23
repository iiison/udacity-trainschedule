export const apikey = 'Z44S-5LSG-9QVT-DWE9';

export const scheduleUrl = ({ from, to, date, scheduleConfigDepartBool, time }) => {
  const
    cmd = scheduleConfigDepartBool ? 'depart' : 'arrive',
    thisDate = `&date=${date || 'now'}`,
    thisTime = time ? `&time=${time}` : '';

  return `http://api.bart.gov/api/sched.aspx?cmd=${cmd}&orig=${from}&dest=${to}${thisDate}${thisTime}&b=4&a=4&l=1&key=${apikey}`;
};

export const stationInfoUrl = ({ from }) =>
  `http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${from}&key=${apikey}`;

export const stationUrl = () =>
  `http://api.bart.gov/api/stn.aspx?cmd=stns&key=${apikey}`;

export const CACHE_VERSION = 0;
