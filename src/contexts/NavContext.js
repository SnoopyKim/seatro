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

export const useNav = () => {
  const state = useContext(NavStateContext);
  const dispatch = useContext(NavDispatchContext);
  if (!state || !dispatch) throw new Error('Cannot find NavProvider');
  return [state, dispatch];
};
