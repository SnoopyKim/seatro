import { useReducer } from 'react';

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

export default function useNavReducer() {
  return useReducer(reducer, initialState);
}
