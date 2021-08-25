import React, { createContext, useContext } from 'react';
import useNavReducer from '../reducers/navReducer';

const NavStateContext = createContext();
const NavDispatchContext = createContext();

export const NavProvider = ({ children }) => {
  const [state, dispatch] = useNavReducer();
  return (
    <NavStateContext.Provider value={state}>
      <NavDispatchContext.Provider value={dispatch}>
        {children}
      </NavDispatchContext.Provider>
    </NavStateContext.Provider>
  );
};

export const useNavState = () => {
  const state = useContext(NavStateContext);
  if (!state) throw new Error('Cannot find NavProvider');
  return state;
};

export const useNavDispatch = () => {
  const dispatch = useContext(NavDispatchContext);
  if (!dispatch) throw new Error('Cannot find NavProvider');
  return dispatch;
};
