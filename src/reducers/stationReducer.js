import { useReducer } from 'react';

const initialState = {
  stations: [],
  popular: {},
  search_list: [],
  station_info: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_STATIONS':
      return {
        ...initialState,
        stations: action.data.stations_list,
        popular: action.data.popular_station,
      };
    case 'SEARCH':
      return {
        ...state,
        search_list: state.stations.filter(
          (station) => station.station_name.indexOf(action.value) !== -1,
        ),
      };
    case 'INIT_SEARCH':
      return {
        ...state,
        search_list: [],
      };
    case 'GET_STATION_INFO':
      return {
        ...state,
        station_info: action.data,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function useStationReducer() {
  return useReducer(reducer, initialState);
}
