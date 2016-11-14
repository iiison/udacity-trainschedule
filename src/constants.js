export const apikey = 'Z44S-5LSG-9QVT-DWE9';
export const scheduleUrl = ({cmd, from, to, date, time}) =>
  `http://api.bart.gov/api/sched.aspx?cmd=${cmd}&orig=${from}&dest=${to}${date}${time}&key=${apikey}&b=4&a=4&l=1`;
