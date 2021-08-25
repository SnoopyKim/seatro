import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext,
} from 'react';

const initialState = {
  loading: false,
  path: '/',
};

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        loading: true,
        path: action.path,
      };
    case 'COMPLETE':
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const NavStateContext = createContext();
const NavDispatchContext = createContext();

export const NavProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
