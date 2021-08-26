import React, { useCallback, useState } from 'react';
import { useStation } from '../contexts/StationContext';
import { useNav } from '../contexts/NavContext';
import { getStationInfo } from '../utils/data';
import './Home.css';
import SearchBar from '../components/SearchBar';

function Home() {
  const [station, dispatchStation] = useStation();
  const [nav, dispatchNav] = useNav();

  const search = useCallback(
    (station) => {
      const { station_name, line_number } = station;
      getStationInfo(station_name, line_number, true).then((res) => {
        console.log(res);
        dispatchStation({ type: 'GET_STATION_INFO', data: res });
        dispatchNav({ type: 'NAVIGATE', path: '/건대입구' });
      });
    },
    [dispatchNav, dispatchStation],
  );

  return (
    <div className="CenterContainer">
      <SearchBar search={search} />
    </div>
  );
}

export default Home;
