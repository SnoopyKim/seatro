import React, { useCallback, useState } from 'react';
import { useNav } from '../contexts/NavContext';
import { useStation } from '../contexts/StationContext';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SearchItem from './SearchItem';
import './SearchBar.css';

function SearchBar({ search }) {
  const [station, dispatchStation] = useStation();
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

  const handleSubmit = useCallback(() => {
    const { search_list } = station;
    console.log(search_list[stationIndex]);
    if (search_list.length > 0) {
      search(search_list[stationIndex]);
      setInput('');
    }
  }, [search, station, stationIndex]);

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
        handleSubmit();
      }
    },
    [station, stationIndex, handleSubmit],
  );

  return (
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
        <div className="IconWrapper" onMouseDown={handleSubmit}>
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
              onClick={handleSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
