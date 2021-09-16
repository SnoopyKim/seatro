import React from 'react';
import qs from 'qs';
import { useStation } from '../contexts/StationContext';
import BackButton from './../components/BackButton';
import LineBadge from '../components/LineBadge';
import CabinCard from './../components/CabinCard';

function Result({ location }) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { station_name, line } = query;
  const [station, dispatchStation] = useStation();
  const { station_info } = station;

  const currentTime = new Date().getHours();

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
        <h1 style={{ fontSize: '2rem' }}>{station_name}</h1>
        {station_info.map((info) => {
          return (
            <>
              <p>
                <b>{info.direction} 방향 예상 이용객</b>&nbsp;&nbsp;
                {`(${currentTime}:00 ~ ${currentTime + 1}:00 기준)`}
              </p>
              <CabinCard info={info} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Result;
