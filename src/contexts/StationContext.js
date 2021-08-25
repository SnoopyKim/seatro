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

export const useNavState = () => {
  const state = useContext(StationStateContext);
  if (!state) throw new Error('Cannot find StationProvider');
  return state;
};

export const useNavDispatch = () => {
  const dispatch = useContext(StationDispatchContext);
  if (!dispatch) throw new Error('Cannot find StationProvider');
  return dispatch;
};
