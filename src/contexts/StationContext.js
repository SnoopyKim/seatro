import React, { createContext, useContext } from 'react';
import useStationReducer from '../reducers/stationReducer';

const StationStateContext = createContext();
const StationDispatchContext = createContext();

export const StationProvider = ({ children }) => {
  const [state, dispatch] = useStationReducer();

  return (
    <StationStateContext.Provider value={state}>
      <StationDispatchContext.Provider value={dispatch}>
        {children}
      </StationDispatchContext.Provider>
    </StationStateContext.Provider>
  );
};

export const useStation = () => {
  const state = useContext(StationStateContext);
  const dispatch = useContext(StationDispatchContext);
  if (!state || !dispatch) throw new Error('Cannot find StationProvider');
  return [state, dispatch];
};
