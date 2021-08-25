import React, { useCallback, useState } from 'react';
import { useStation } from '../contexts/StationContext';
import { useNav } from '../contexts/NavContext';
import { getStationInfo } from '../utils/data';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SearchItem from './../components/SearchItem';
import './Home.css';

function Home() {
  const [station, dispatchStation] = useStation();
  const [nav, dispatchNav] = useNav();
  const [input, setInput] = useState('');
  const [stationIndex, setStationIndex] = useState(0);

  const handleInput = useCallback(
    (e) => {
      const { value } = e.target;
      setInput(value);
      dispatchStation({ type: 'SEARCH', value });
      setStationIndex(0);
    },
    [dispatchStation],
  );

  const handleKeyDown = useCallback(
    (e) => {
      const { search_list } = station;
      if (e.isComposing || e.keyCode === 229) return;
      // 자동완성 선택
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        stationIndex === search_list.length - 1
          ? setStationIndex(0)
          : setStationIndex(stationIndex + 1);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        stationIndex === 0
          ? setStationIndex(search_list.length - 1)
          : setStationIndex(stationIndex - 1);
      }
      // 검색
      if (e.code === 'Enter') {
        e.preventDefault();
        search();
      }
    },
    [station, stationIndex],
  );

  const search = useCallback(() => {
    const { search_list } = station;
    console.log(search_list[stationIndex]);
    if (search_list.length > 0) {
      const { station_name, line_number } = search_list[stationIndex];
      getStationInfo(station_name, line_number, true).then((res) => {
        console.log(res);
        dispatchStation({ type: 'GET_STATION_INFO', data: res });
        dispatchNav({ type: 'NAVIGATE', path: '/건대입구' });
        setInput('');
      });
    }
  }, [dispatchNav, dispatchStation, station, stationIndex]);

  return (
    <div style={{ flex: 1, flexDirection: 'column' }}>
      <div
        style={{
          flexDirection: 'column',
          marginTop: 'calc(50vh - 15px)',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div className="InputWrapper">
          <div className="SearchWrapper">
            <input
              id="search"
              type="text"
              placeholder="역이름을 검색해주세요"
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onBlur={() => dispatchStation({ type: 'INIT_SEARCH' })}
              onFocus={handleInput}
              value={input}
              autoComplete="off"
            />
            <div className="IconWrapper" onMouseDown={search}>
              {' '}
              <SearchOutlinedIcon
                style={{ fontSize: 30, color: 'white' }}
              ></SearchOutlinedIcon>
            </div>
          </div>{' '}
          {station.search_list.length > 0 && (
            <div
              className="StationList"
              style={{ flexDirection: 'column', zIndex: 1 }}
            >
              {station.search_list.map((stationData, idx) => (
                <SearchItem
                  key={stationData.station_name + stationData.line_number}
                  data={stationData}
                  focus={idx === stationIndex}
                  onHover={() => setStationIndex(idx)}
                  onClick={search}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
