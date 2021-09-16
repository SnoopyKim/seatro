const testData = {
  stations: {
    stations_list: [
      { station_name: '강남구청', line_number: '7호선' },
      { station_name: '강남구청', line_number: '분당선' },
      { station_name: '건대입구', line_number: '2호선' },
      { station_name: '건대입구', line_number: '7호선' },
      { station_name: '고속버스터미널', line_number: '3호선' },
      { station_name: '고속버스터미널', line_number: '7호선' },
      { station_name: '고속버스터미널', line_number: '9호선' },
      { station_name: '군자', line_number: '5호선' },
      { station_name: '군자', line_number: '7호선' },
      { station_name: '논현', line_number: '7호선' },
      { station_name: '뚝섬 유원지', line_number: '7호선' },
      { station_name: '반포', line_number: '7호선' },
      { station_name: '어린이대공원', line_number: '7호선' },
      { station_name: '청담', line_number: '7호선' },
      { station_name: '학동', line_number: '7호선' },
    ],
    popular_station: {
      station_name: '건대입구',
      line_number: '2호선',
      time: 23,
      people: 95,
    },
  },
  stationInfo: [
    {
      cabin: [3, 10, 10, 10, 10, 10, 10, 10],
      direction: '어린이대공원',
      first_time: '05:55',
      last_time: '23:55',
    },
    {
      cabin: [3, 19, 19, 19, 19, 19, 19, 19],
      direction: '뚝섬 유원지',
      first_time: '05:55',
      last_time: '23:55',
    },
  ],
};

export default testData;
