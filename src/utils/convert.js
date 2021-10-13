export const formatTimeString = (time) => {
  if (typeof time != 'string') return time;

  const _time = time.split(':');
  return `${_time[0]}시 ${_time[1]}분`;
};
