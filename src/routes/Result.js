import React from 'react';
import qs from 'qs';
import { useStation } from '../contexts/StationContext';

function Result({ location }) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { station_name, line } = query;
  const [station, dispatchStation] = useStation();
  const { station_info } = station;

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          marginTop: '2rem',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <strong>{line}</strong>
        <strong>{station_name}</strong>
        {station_info.map((info) => {
          return <p>{info.direction}</p>;
        })}
      </div>
    </div>
  );
}

export default Result;
