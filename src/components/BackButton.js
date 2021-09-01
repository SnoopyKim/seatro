import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useNav } from '../contexts/NavContext';
function BackButton() {
  const [navState, navDispatch] = useNav();
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '5rem',
        height: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => navDispatch({ type: 'NAVIGATE', path: '/' })}
    >
      <ArrowBack style={{ fontSize: '3rem', color: 'black' }} />
    </div>
  );
}

export default BackButton;
