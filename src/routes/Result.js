import React, { useEffect } from 'react';
import qs from 'qs';
import { useStation } from '../contexts/StationContext';
import BackButton from './../components/BackButton';
import LineBadge from '../components/LineBadge';
import CabinCard from './../components/CabinCard';
import { getStationInfo } from '../utils/data';
import { formatTimeString } from '../utils/convert';

function Result({ location }) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { station_name, line } = query;
  const [station, dispatchStation] = useStation();
  const { station_info } = station;

  const currentTime = new Date().getHours();

  useEffect(() => {
    if (station_name && line) {
      getStationInfo(station_name, line, true).then((res) => {
        console.log(res);
        dispatchStation({ type: 'GET_STATION_INFO', data: res });
      });
    }
  }, [dispatchStation, station_name, line]);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <BackButton />

      {station_name && line ? (
        <div
          style={{
            marginTop: '3rem',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LineBadge
            line_number={line}
            style={{
              fontSize: '1rem',
              padding: '0.5rem 2rem',
              borderRadius: '1rem',
            }}
          />
          <h1 style={{ fontSize: '2rem' }}>{station_name}</h1>
          {station_info?.map((info, index) => {
            return (
              <React.Fragment key={index}>
                <p style={{ marginBottom: 5 }}>
                  <b>{info.direction} 방향 예상 이용객</b>&nbsp;&nbsp;
                  {`(${currentTime}:00 ~ ${currentTime + 1}:00 기준)`}
                </p>
                <p style={{ marginTop: 5 }}>
                  첫차: {formatTimeString(info.first_time)}&nbsp;&nbsp;<b>|</b>
                  &nbsp;&nbsp;막차: {formatTimeString(info.last_time)}
                </p>
                <CabinCard info={info} />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>해당 지하철역 및 노선 정보가 없습니다</h1>
        </div>
      )}
    </div>
  );
}

export default Result;
