import React from 'react';
import qs from 'qs';
import { useStation } from '../contexts/StationContext';
import BackButton from './../components/BackButton';
import LineBadge from '../components/LineBadge';

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
          marginTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <BackButton />
        <LineBadge
          line_number={line}
          style={{
            fontSize: '1rem',
            padding: '0.5rem 2rem',
            borderRadius: '1rem',
          }}
        />
        <strong>{station_name}</strong>
        {station_info.map((info) => {
          return <p>{info.direction}</p>;
        })}
      </div>
    </div>
  );
}

export default Result;
