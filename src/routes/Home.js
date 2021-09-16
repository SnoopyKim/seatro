import React, { useCallback, useState } from 'react';
import { useStation } from '../contexts/StationContext';
import { useNav } from '../contexts/NavContext';
import { getStationInfo } from '../utils/data';
import './Home.css';
import SearchBar from '../components/SearchBar';
import PopularView from '../components/PopularView';

function Home() {
  const [station, dispatchStation] = useStation();
  const [nav, dispatchNav] = useNav();

  const search = useCallback(
    (station) => {
      const { station_name, line_number } = station;
      getStationInfo(station_name, line_number, true).then((res) => {
        console.log(res);
        dispatchStation({ type: 'GET_STATION_INFO', data: res });
        dispatchNav({
          type: 'NAVIGATE',
          path: '/station?station_name=건대입구&line=7호선',
        });
      });
    },
    [dispatchNav, dispatchStation],
  );

  return (
    <div className="CenterContainer">
      <h1>Seatro</h1>
      <SearchBar search={search} />
      <PopularView station={station.popular} />
    </div>
  );
}

export default Home;
